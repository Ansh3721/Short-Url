# Short URL Service

A lightweight URL shortener built with Node.js, Express, and MongoDB. It generates short aliases for long URLs, stores click history, and redirects users to the original destination.

## Features

- Create short URLs from long links
- Redirect users using the short alias
- Prevent duplicate short links for the same original URL
- Track visit history for each shortened URL
- Built with Express and MongoDB for easy deployment

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- Nano ID for URL generation
- dotenv for environment management

## Project Structure

```bash
Short_url/
├── controller/
│   └── url.js          # Handler logic for URL creation and redirects
├── models/
│   └── url.js          # Mongoose schema for stored URLs
├── routes/
│   └── url.js          # API routes
├── .env                # Environment configuration
├── connect.js          # MongoDB connection setup
├── index.js            # App entry point
├── package.json        # Dependencies and scripts
├── README.md           # Project documentation
├── .gitignore          # Git ignore rules
└── node_modules/       # Installed project dependencies
```

## Prerequisites

Before running this project, make sure you have:

- Node.js installed
- MongoDB database available
- A MongoDB connection string

## Installation

1. Clone the repository
2. Navigate to the project folder
3. Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root and add your MongoDB connection string:

```env
PORT=3000
MONGO_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

## Run the Project

Start the server:

```bash
npm start
```

For development with automatic restarts:

```bash
npm run dev
```

The app will run on:

```bash
http://localhost:3000
```

## Deploy with Vercel

Add `MONGO_URL` as a Vercel project environment variable for the Production
environment. Use the new MongoDB Atlas connection string after rotating any
credential that has been exposed. Also add Vercel's outbound access in the
Atlas network access configuration (for development, `0.0.0.0/0` can be used
only with a strong database password and least-privilege database user).

After adding or changing the variable, redeploy the project. Do not commit
`.env`; it is ignored by Git and is only for local development.

## API Endpoints

### 1. Create a short URL

Request:

```http
POST /url
Content-Type: application/json
```

Body:

```json
{
  "redirectUrl": "https://example.com/very/long/url"
}
```

Response:

```json
{
  "id": "abcd1234"
}
```

### 2. Open a shortened URL

Request:

```http
GET /:shortId
```

Example:

```http
GET /abcd1234
```

This will redirect the browser to the original URL and record the visit in the database.

## Example Usage

### Create a short link with curl

```bash
curl -X POST http://localhost:3000/url \
  -H "Content-Type: application/json" \
  -d '{"redirectUrl":"https://example.com"}'
```

### Redirect with browser

```bash
http://localhost:3000/abcd1234
```

## Notes

- Duplicate long URLs return the same short ID instead of creating a new one.
- Visit timestamps are stored in the `visitHistory` array for tracking.
- This project is suitable for learning backend routing, MongoDB integration, and URL shortening logic.

## License

This project is licensed under the ISC License.

## Author
Ansh Mishra