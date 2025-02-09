const express = require('express');
const router = express.Router();
const { StudySession } = require('../models/database');

// Middleware to log requests
const logRequest = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

router.use(logRequest);

// Get all study sessions
router.get('/', async (req, res) => {
  try {
    const sessions = await StudySession.findAll();
    res.render('index', { sessions });
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start a new study session
router.post('/start', async (req, res) => {
  try {
    const newSession = await StudySession.create({ startTime: new Date() });
    res.status(201).json(newSession);
  } catch (error) {
    console.error('Error starting session:', error);
    res.status(500).json({ error: 'Failed to start session' });
  }
});

// Stop an existing study session
router.post('/stop/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Session ID is required' });
  }

  try {
    let session = await StudySession.findByPk(id);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    session.endTime = new Date();
    await session.save();
    res.json(session);
  } catch (error) {
    console.error('Error stopping session:', error);
    res.status(500).json({ error: 'Failed to stop session' });
  }
});

module.exports = router;
