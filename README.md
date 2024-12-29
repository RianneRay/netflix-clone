# Netflix Clone

This is a Netflix clone app built with the MERN stack (MongoDB, Express, React, Node.js). The app includes features like user authentication, a homepage with movie and TV show sliders, search functionality, and more. However, the current version does not include actual movie streaming, but it displays trailers for the selected content.

## Features

- **User Authentication**: Sign up, login, and session management.
- **Home Page**: Displays movie and TV show categories with sliders.
- **Search Page**: Allows searching for movies, TV shows, or actors.
- **Watch Page**: Displays trailers for the selected movie or TV show.
- **History Page**: Displays a user's previous search history.

## Installation

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB (locally or use a cloud service like MongoDB Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/netflix-clone.git
cd netflix-clone
```
## 2. Install and Build the App

To install dependencies and build the frontend as a static path, run the following command:

```bash
npm run build
```
## 3. Start the App in Production

Once the build is completed, start the application in production mode using:

```bash
npm run start
```
This command will:

- Set the environment to production and start the backend server (`server.js`) on [http://localhost:5000](http://localhost:5000).
- The static frontend files will be served from the `frontend/build` directory.

## Usage

1. **Sign Up and Login**: Users can sign up or log in using the provided forms.

2. **Browse Movies and TV Shows**: On the homepage, users can explore content in various categories.

3. **Search for Movies/TV Shows/Actors**: The search bar allows users to search for content.

4. **Watch Trailers**: The Watch page displays trailers for the selected movie or show. This page does not include full movie streaming at this time.

5. **Search History**: Users can view their previous search queries in the History page.

## Scripts

In your terminal, you can run the following commands:

- `npm run build`: Installs all dependencies and builds the frontend React app into a static folder.
- `npm run start`: Starts the app in production mode. This serves the backend API and the static frontend files.

## Environment Variables Setup

Before running the application, you need to configure your environment variables. Create a `.env` file in the root of your project and add the following values:

- `MONGO_URI`: The connection string to your MongoDB database (use MongoDB Atlas or your local MongoDB URI).
- `PORT`: The port on which the server will run.
- `JWT_SECRET`: A secret key used for JWT authentication.
- `NODE_ENV`: Set to `development` during development or `production` for production.
- `TMDB_API_KEY`: Your API key from TMDB (The Movie Database) to fetch movie data.

Once you've added these variables to your `.env` file, the application will be ready to run.

**Note**: Make sure that your `.env` file is added to `.gitignore` to avoid exposing sensitive information, like your database URI and JWT secret, in your version control.

## Tech Stack

- **Frontend**: React, React Router, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Database**: MongoDB (locally or using MongoDB Atlas)

## Contact

If you have any questions, feel free to reach out to:
- **Email**: [riannerayrelevo04@gmail.com](mailto:riannerayrelevo04@gmail.com)
- **GitHub**: [RianneRay](https://github.com/RianneRay)
