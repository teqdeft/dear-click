# DearClick - Battle & Winner Module

## Project Name -- **DearClick**

## Project Goal

The primary objective of this module is to allow users to participate in content-based battles (images, reels, or videos) under specific interests and compete to become weekly winners.  
This module automates the selection of top posts each week based on like counts and engagement.

---

## Project Features

1. **Battle Creation:**  
   Users can create battle posts by uploading reels or images with captions and interests. Each battle post is stored with metadata like likes, captions, and timestamps.

2. **Weekly Winner Selection:**  
   A backend process automatically determines weekly winners based on post likes within the defined week period (Monday–Saturday). The top three users are saved in the `winners` table.

3. **Interest-Based Filtering:**  
   Battles are categorized by `interestId`, allowing users to participate in or view posts from specific interests.

4. **User Battle History:**  
   Users can view both live (ongoing) and historical (won) battle posts through a single endpoint.

5. **JWT Authentication:**  
   All routes are protected using JWT tokens for secure access.

6. **Media Upload Support:**  
   Media uploads are handled efficiently using `multer` and stored in a local `uploads` directory.

7. **Database Management:**  
   Knex.js is used for migrations, seeds, and queries with MySQL as the underlying database.

---

## Project User Flow and Features

1. **User Authentication:**

   - A user must be logged in using JWT authentication to access any battle or winner routes.

2. **Create a Battle Post:**

   - The user uploads a post (image/reel) with caption and interest ID.
   - The backend stores the battle post with user and interest metadata.

3. **View All Battles:**

   - Authenticated users can view all active battle posts or filter by interest.

4. **Weekly Winner Logic:**

   - Every week, the system checks battles created during the week.
   - It ranks the top three posts with the highest likes.
   - These winners are inserted into the `winners` table and marked as `isWinner = true` in battles.

5. **Battle History:**
   - The user can view live battles and past winning posts separately.

---

## Developing Environment

- **Node Version:** v18.16.0
- **NPM Version:** v9.5.1
- **Knex Version:** v3.1.0
- **MySQL Version:** v8+
- **OS:** Windows 10
- **Installed NVM Version:** v1.1.10

---

## Project Setup

### For Running Node Server Locally

```bash
npm install
npm run start:local


## Tech Stack

- **Runtime:** Node.js (v18+)
- **Framework:** Express.js
- **Database:** MySQL
- **ORM/Query Builder:** Knex.js
- **Authentication:** JWT
- **File Uploads:** Multer
- **Date Handling:** Day.js
- **Environment Management:** dotenv, env-cmd

---

# Clone repository

git clone https://github.com/<your-org>/dearclick.git

# Navigate to project

cd dearclick

# Install dependencies

npm install

# Run development server

npm run start:local




```
