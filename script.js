const API_KEY = '42fc4ee97cmsh08a8aafc5c14c0fp10a86fjsnc9429bd092f1'
const API_HOST = 'wft-geo-db.p.rapidapi.com';
const API_URL = `https://${API_HOST}/v1/geo/cities`;

const searchBox = document.getElementById('searchBox');
const resultsTable = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageNum = document.getElementById('pageNum');
const dataLimit = document.getElementById('dataLimit');
const loadingSpinner = document.getElementById('loadingSpinner');
const pagination = document.querySelector('.pagination');

let currentPage = 1;
let limit = 3;

dataLimit.addEventListener('input', function() {
  const value = parseInt(dataLimit.value, 10);
  if (value >= 1 && value <= 10) {
    limit = value;
    currentPage = 1;
    fetchData();
  } else if (value > 10) {
    dataLimit.value = 10;
    alert('You can only fetch up to 10 items per page.');
    limit = 10;
    fetchData();
  }
});

searchBox.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    fetchData();
  }
});

prevBtn.addEventListener('click', function() {
  if (currentPage > 1) {
    currentPage--;
    fetchData();
  }
});

nextBtn.addEventListener('click', function() {
  currentPage++;
  fetchData();
});

document.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === '/') {
    e.preventDefault();
    searchBox.focus();
  }
});

async function fetchData() {
  const query = searchBox.value.trim();

  if (!query) {
    resultsTable.innerHTML = '<tr><td colspan="3">Start searching</td></tr>';
    pagination.style.display = 'none';
    return;
  }

  loadingSpinner.style.display = 'block';
  pagination.style.display = 'none';

  try {
    const response = await fetch(`${API_URL}?namePrefix=${query}&limit=${limit}&offset=${(currentPage - 1) * limit}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST
      }
    });

    const data = await response.json();

    if (data.data && data.data.length > 0) {
      resultsTable.innerHTML = data.data.map((place, index) => {
        return `<tr>
                  <td>${(currentPage - 1) * limit + index + 1}</td>
                  <td>${place.name}</td>
                  <td>${place.country} <img src="https://flagsapi.com/${place.countryCode}/flat/32.png" alt="${place.country}" /></td>
                </tr>`;
      }).join('');

      pageNum.textContent = `Page: ${currentPage}`;
      pagination.style.display = 'flex';

      prevBtn.disabled = currentPage === 1;
      nextBtn.disabled = !data.links || !data.links.some(link => link.rel === 'next');
    } else {
      resultsTable.innerHTML = '<tr><td colspan="3">No result found</td></tr>';
      pagination.style.display = 'none';
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    resultsTable.innerHTML = '<tr><td colspan="3">Error fetching data</td></tr>';
    pagination.style.display = 'none';
  } finally {
    loadingSpinner.style.display = 'none';
  }
}
