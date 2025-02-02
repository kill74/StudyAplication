const express = require('express');
const router = express.Router();

// Importing the controller or handler functions (if any)
// const { someHandler } = require('../controllers/someController');

// Define the routes
router.get('/', (req, res) => {
    res.render('index'); // Render the main view
});

// Additional routes can be defined here
// router.get('/some-path', someHandler);

module.exports = router;