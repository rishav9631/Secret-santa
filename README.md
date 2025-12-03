# Secret Santa Assignment Wheel

This is a MERN stack application for Secret Santa assignments.

## Features

- **Login**: Hardcoded users authentication.
- **Dashboard**: Spin the wheel to get your Secret Santa assignment.
- **Backend**: Stores assignments in MongoDB.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Shadcn UI
- **Backend**: Node.js, Express, MongoDB

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    cd server
    npm install
    ```

2.  **Start the Server**:
    ```bash
    cd server
    npm run dev
    ```
    Server runs on `http://localhost:5000`.

3.  **Start the Frontend**:
    ```bash
    npm run dev
    ```
    Frontend runs on `http://localhost:8080`.

## Usage

1.  Login with one of the hardcoded users (e.g., `kumrisha` / `Rishav123`).
2.  Click "Spin the Wheel" to get your assignment.
3.  The assignment is saved to the MongoDB database.
