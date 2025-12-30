# Niya Backend API

The backend service for the **Niya Prayer Tracker**, handling data synchronization and user settings persistence.

## 🔌 API Features

*   **Data Synchronization**: Syncs local prayer logs from the frontend to a centralized database (MySQL/PostgreSQL via Sequelize).
*   **User Settings**: Persists user preferences (Location, Calculation Method) across devices.
*   **RESTful Architecture**: Simple, clean API endpoints.

## 🛠️ Tech Stack

*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **ORM**: Sequelize
*   **Database**: MySQL (or any SQL dialect supported by Sequelize)

## 🚀 Setup & Usage

1.  **Navigate to backend**:
    ```bash
    cd backend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment**:
    Create a `.env` file in the root directory:
    ```env
    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=yourpassword
    DB_NAME=niyat
    ```

4.  **Run the server**:
    ```bash
    npm start
    # or for development with auto-reload:
    npm run dev (if nodemon is installed)
    node server/index.js
    ```

## 📡 API Endpoints

### `POST /api/sync`
Syncs prayer logs and user settings.
**Body:**
```json
{
  "logs": [
    { "date": "2024-01-01", "fajr_status": "PRAYED", ... }
  ],
  "settings": {
    "calculationMethod": "Karachi",
    "locationName": "London, UK",
    "coordinates": { "latitude": 51.5, "longitude": -0.1 }
  }
}
```

### `GET /api/logs`
Retrieve synced logs (optional, primarily for cloud backup/restore features).

## 🤝 Contributing

**Free to use and open for contributions!**
Feel free to open issues or submit PRs to improve the backend architecture or add authentication features.

## 📄 License

Distributed under the **MIT License**.
