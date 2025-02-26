# Leaderboard Voting API

A simple ranking system where users can vote for participants, and the leaderboard updates dynamically. The system ensures real-time updates with caching for improved performance.

## Features
- **Vote System**: Users vote (score 1-100) for participants.
- **Leaderboard Ranking**: Scores are aggregated, and participants are ranked dynamically.
- **Caching with Redis**: Optimized leaderboard retrieval for performance.
- **Vote Updates**: Latest vote per user is considered.
- **Scalability**: Handles high traffic efficiently.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Caching**: Redis
- **Frontend**: React.js (Example provided)

## Installation

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB (Locally or via MongoDB Atlas)
- Redis (Install Redis locally or use a cloud service)

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/leaderboard-api.git
   cd leaderboard-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables (`.env` file):
   ```sh
   DB_URL=your_mongodb_connection_string
   PORT=5000
   ```
4. Start Redis (if running locally):
   ```sh
   redis-server
   ```
5. Run the server:
   ```sh
   npm start
   ```

## API Endpoints

### 1. Submit or Update a Vote
**Endpoint:** `POST /vote`

**Request Body:**
```json
{
  "voterId": "user123",
  "participantId": "player456",
  "score": 85
}
```
**Response:**
```json
{
  "message": "Vote recorded successfully"
}
```

### 2. Get Leaderboard (Cached)
**Endpoint:** `GET /leaderboard`

**Response:**
```json
[
  { "rank": 1, "participant": "player456", "score": 250 },
  { "rank": 2, "participant": "player789", "score": 200 }
]
```

## How Caching Works
- Leaderboard data is cached in **Redis** for 10 seconds.
- After a vote is cast, the cache is **cleared**, ensuring real-time updates.
- If cached data exists, the API **returns leaderboard instantly** without querying MongoDB.

## Running the Frontend
An example React frontend is available. Install dependencies and run:
```sh
cd frontend
npm install
npm start
```

## Future Enhancements
- WebSockets for real-time updates.
- More robust anti-manipulation measures.
- Pagination for large leaderboards.

## License
This project is open-source under the MIT License.

---
### 🚀 Enjoy coding and optimize rankings efficiently!
