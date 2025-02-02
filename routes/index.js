const express = require('express');
const router = express.Router();
const { StudySession } = require('../models/database');

router.get('/', async (req, res) => {
  try {
    const sessions = await StudySession.findAll();
    res.render('index', { sessions });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno');
  }
});

router.post('/start', async (req, res) => {
  try {
    const newSession = await StudySession.create({ startTime: new Date() });
    res.json(newSession);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao iniciar sessão' });
  }
});

router.post('/stop/:id', async (req, res) => {
  try {
    const session = await StudySession.findByPk(req.params.id);
    session.endTime = new Date();
    await session.save();
    res.json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao parar sessão' });
  }
});

module.exports = router;