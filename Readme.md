# Search Places

A simple web application that allows users to search for places by name, view country details, and navigate through paginated results.

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)

## Project Structure

This project consists of:

- `index.html`: The main HTML file that structures the app.
- `styles.css`: CSS file for styling the user interface.
- `script.js`: JavaScript file to handle API calls and application logic.

## Getting Started

To run this project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/NISHANT0318/search_places
   cd your-repo-name

   ```

2. Open the project in your browser: Simply open index.html in any modern web browser to start the application.
   

Usage
1.Search for Places:

Enter a place name in the search box to retrieve results.
The table will display the place name and its country.

2.Pagination:

Use the Prev and Next buttons to navigate through paginated results.
Adjust the number of items per page with the "Items per page" input.

3.API Configuration:

This project uses the GeoDB Cities API to fetch place information.(https://wft-geo-db.p.rapidapi.com/v1/geo/cities)
Ensure your API_KEY and API_HOST are correctly configured in script.js for the application to function.
Dependencies
This project uses the GeoDB Cities API to retrieve place data. Replace the placeholder API_KEY and API_HOST with your own values from RapidAPI.
