const express = require('express');

const {
  getAllActivities
} = require('../utils/fsUtils');

const router = express.Router();

router.get('/', async (req, res) => {
  const activities = await getAllActivities();

  try {
    return res.status(200).json(activities);
  } catch (error) {
    return res.status(500).json({
      message: 'Um erro inesperado ocorreu no servidor, tente mais tarde!',
    });
  };
});

module.exports = router;