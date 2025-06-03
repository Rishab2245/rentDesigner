# EmptyCup Interior Designer Listings

This project implements a mobile web page for EmptyCup's platform that lists interior designers. The page allows users to view designer details and shortlist their favorites.

## Features

- Mobile-responsive design matching the Figma specifications
- Shortlisting functionality with toggle buttons
- Filter to view only shortlisted designers
- Backend API integration using Flask
- Docker setup for local development

## Project Structure

```
emptycup_assignment/
├── static/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── designers.json
│   │   └── script.js
│   ├── images/
│   └── icons/
│       ├── contacts.svg
│       ├── details.svg
│       ├── gallery.svg
│       ├── hide.svg
│       ├── map.svg
│       ├── menu.svg
│       ├── report.svg
│       ├── shortlist.svg
│       ├── shortlisted.svg
│       └── sort.svg
├── templates/
│   └── index.html
├── app.py
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Setup Instructions

### Local Development (Without Docker)

1. Clone the repository
2. Install Flask:
   ```
   pip install flask
   ```
3. Run the Flask application:
   ```
   python app.py
   ```
4. Open your browser and navigate to `http://localhost:5000`

### Local Development (With Docker)

1. Clone the repository
2. Make sure Docker and Docker Compose are installed
3. Build and run the containers:
   ```
   docker-compose up --build
   ```
4. Open your browser and navigate to `http://localhost:5000`

## Implementation Details

### Frontend

- HTML structure based on the Figma design
- CSS styling for pixel-perfect mobile view
- JavaScript for dynamic content loading and interactivity
- Shortlisting functionality with toggle buttons
- Filter to view only shortlisted designers

### Backend

- Flask application serving the HTML page
- API endpoint (`/api/designers`) to provide designer data
- Static file serving for CSS, JavaScript, and assets

### Deployment

- Docker configuration for containerized deployment
- Docker Compose for orchestrating services

## Technologies Used

- HTML5, CSS3, JavaScript (ES6+)
- Flask (Python web framework)
- Docker and Docker Compose

## Notes

- The "Details", "Hide", and "Report" buttons are non-functional as per the assignment requirements
- Only the "Shortlist" button and "Shortlisted" filter are implemented with functionality
