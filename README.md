# Study Time Tracker 🍀

A simple application to track study time.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/study-time-tracker.git
    cd study-time-tracker
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Start the server:
    ```sh
    npm start
    ```

4. Open your browser and navigate to `http://localhost:3000`.

## Usage

- Click the "▶️ Iniciar Estudo" button to start a new study session.
- Click the "⏹️ Parar Estudo" button to stop the current study session.
- The current session time will be displayed in real-time.
- The total study time for today and the week will be displayed.
- The session history will be listed below.

## Project Structure
/STUDYAPLICATION
  ├── public/
  │    ├── css/
  │    │    └── style.css
  │    └── js/
  │         └── app.js
  ├── views/
  │    ├── index.ejs
  │    └── partials/
  │         └── header.ejs
  ├── models/
  │    └── database.js
  ├── routes/
  │    └── index.js
  ├── package.json
  └── server.js


## Dependencies

- [axios](https://www.npmjs.com/package/axios)
- [ejs](https://www.npmjs.com/package/ejs)
- [express](https://www.npmjs.com/package/express)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [sequelize](https://www.npmjs.com/package/sequelize)
- [sqlite3](https://www.npmjs.com/package/sqlite3)

## License

This project is licensed under the ISC License.