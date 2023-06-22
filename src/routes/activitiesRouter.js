const express = require('express');

const {
  getAllActivities, getActivityById
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

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const activity = await getActivityById(Number(id));

  if (!activity) {
    return res.status(404).send({ message: 'Atividade não encontrada' });
  }

  return res.status(200).json(activity);
});

module.exports = router;