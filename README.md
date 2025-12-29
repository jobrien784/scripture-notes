# Scripture Notes

A beautiful, spiritually-inspired note-taking application for Bible study. Organize your thoughts into four panes: **People**, **Places**, **Events**, and **Verses**.

## Screenshot

*Screenshot coming soon*

## Getting Started

Follow these steps to download and run Scripture Notes on your computer.

### Prerequisites

You'll need **Node.js version 18 or higher** installed on your computer.

**How to check if you have Node.js:**

1. Open your terminal:
   - **Mac**: Press `Cmd + Space`, type "Terminal", and press Enter
   - **Windows**: Press `Win + R`, type "cmd", and press Enter
2. Type this command and press Enter:
   ```
   node --version
   ```
3. If you see a version number like `v18.0.0` or higher, you're good to go!

**If you don't have Node.js:**

Download and install it from [nodejs.org](https://nodejs.org). Choose the "LTS" (Long Term Support) version.

### Installation

1. **Download this project**

   If you have Git installed, open your terminal and run:
   ```bash
   git clone https://github.com/YOUR_USERNAME/scripture-notes.git
   ```

   Or download the ZIP file from GitHub and extract it to a folder on your computer.

2. **Open the project folder**

   In your terminal, navigate to the project folder:
   ```bash
   cd scripture-notes
   ```

3. **Install dependencies**

   Run this command to download all the required packages:
   ```bash
   npm install
   ```

   This may take a minute or two. You'll see some progress messages.

4. **Start the application**

   Run this command to start both the frontend and backend:
   ```bash
   npm run dev
   ```

5. **Open in your browser**

   Once you see a message saying the server is running, open your web browser and go to:
   ```
   http://localhost:5173
   ```

   You should now see Scripture Notes running!

### Stopping the Application

To stop the application, go back to your terminal and press `Ctrl + C`.

## Features

- **Four-Pane Organization**: Keep your study notes organized into People, Places, Events, and Verses
- **Multiple Notes**: Create separate notes for different Bible studies, sermons, or reflections
- **Persistent Storage**: Your notes are automatically saved to a local database
- **Beautiful Design**: A warm, contemplative aesthetic inspired by leather-bound Bibles
- **Dark Mode**: Easy on the eyes for late-night study sessions

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React** | Frontend user interface |
| **TypeScript** | Type-safe JavaScript |
| **Tailwind CSS** | Styling and design |
| **Express** | Backend API server |
| **SQLite** | Local database for storing notes |
| **Vite** | Fast development and building |

## License

This project is open source and available under the MIT License.
