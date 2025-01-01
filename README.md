News API Integration - Docker Setup

Overview
This project integrates with the NewsAPI to fetch news articles based on filters like category, source, author, and date. It uses Material-UI components to display articles with error handling and Snackbar notifications.

1) Clone the Repository:
git clone <your-repository-url>
cd <your-project-folder>

2) Install Dependencies:
npm install

3) Start the Development Server:
npm start

The application will be accessible at http://localhost:3000

Docker Setup

1) Create Dockerfile:
FROM node:16
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

2) Build the Docker Image:
docker build -t news-api-frontend .

3) Run the Docker Container:
docker run -p 3000:3000 news-api-frontend

Access the application at http://localhost:3000

Note: Notes & Limitations

1) Author Filter:

API Limitation: The NewsAPI does not support filtering by author directly.
Implementation: Filtering by author is implemented locally within the application after fetching the articles. The author filter compares the author field in each article with the input from the user.

2) Category & Source:

API Limitation: The NewsAPI does not support using both category and source parameters together in the same request.
Implementation: You can only use one of category or source as a filter in the API request at a time. Applying both simultaneously might lead to errors or unexpected behavior.

3) Supported Filters:

Category Filter: The API supports a category parameter; however, it is not guaranteed to return resultsfor all categories, depending on the data availability in the selected sources.
Source Filter: The API allows filtering by a single news source (e.g., BBC, New York Times, The Guardian). Filtering by multiple sources in a single request is not supported.

4) Fallback for Empty Results:

Local Handling: In case the API does not return any articles or no articles match the filter criteria, a "No articles found" message will be displayed in the UI.

5) TextField for Author:

A TextField component is provided for users to input the author’s name. After fetching the articles, the application filters them locally by matching the author field of the articles with the provided input.