# EmptyCup Interior Designer Listings

This project implements a mobile web page for EmptyCup's platform that lists interior designers. The page allows users to view designer details and shortlist their favorites.

## Features

- Mobile-responsive design matching the Figma specifications
- Shortlisting functionality with toggle buttons
- Filter to view only shortlisted designers
- Backend API integration using Flask
- MongoDB database integration
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
│   │   └── logo.png
│   └── icons/
│       ├── contacts.png
│       ├── details.png
│       ├── gallery.png
│       ├── hide.png
│       ├── map.png
│       ├── menu.png
│       ├── report.png
│       ├── shortlist-click.png
│       ├── shortlist-unclick.png
│       ├── shortlisted-click.png
│       ├── shortlisted-unclick.png
│       └── sort.png
├── templates/
│   └── index.html
├── app.py
├── database.py
├── requirements.txt
├── .env.example
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## MongoDB Integration

The application now uses MongoDB to store and retrieve designer data. The database connection is configured using environment variables.

### Setup Instructions

1. Create a `.env` file in the project root directory based on the `.env.example` file:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.hiac1u8.mongodb.net/
   MONGODB_DB_NAME=emptycup
   ```

2. Replace `<username>` and `<password>` with your MongoDB Atlas credentials.

3. The application will automatically initialize the database with sample data from `designers.json` on first run.

## Setup Instructions

### Local Development (Without Docker)

1. Clone the repository
2. Create and configure the `.env` file as described above
3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
4. Run the Flask application:
   ```
   python app.py
   ```
5. Open your browser and navigate to `http://localhost:5000`

### Local Development (With Docker)

1. Clone the repository
2. Create and configure the `.env` file as described above
3. Make sure Docker and Docker Compose are installed
4. Build and run the containers:
   ```
   docker-compose up --build
   ```
5. Open your browser and navigate to `http://localhost:5000`

## Implementation Details

### Frontend

- HTML structure based on the Figma design
- CSS styling for pixel-perfect mobile view
- JavaScript for dynamic content loading and interactivity
- Shortlisting functionality with toggle buttons
- Filter to view only shortlisted designers

### Backend

- Flask application serving the HTML page
- API endpoints:
  - `GET /api/designers` - Get all designers
  - `PUT /api/designers/<id>/shortlist` - Update shortlist status
- MongoDB integration for data persistence
- Environment variable configuration for database connection

### Database

- MongoDB Atlas for cloud database storage
- Automatic database initialization with sample data
- Data models for designers collection

### Deployment

- Docker configuration for containerized deployment
- Docker Compose for orchestrating services
- Environment variable management for configuration

## Technologies Used

- HTML5, CSS3, JavaScript (ES6+)
- Flask (Python web framework)
- MongoDB (Database)
- Docker and Docker Compose

## Notes

- The "Details", "Hide", and "Report" buttons are non-functional as per the assignment requirements
- Only the "Shortlist" button and "Shortlisted" filter are implemented with functionality
