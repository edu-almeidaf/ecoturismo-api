const express = require('express');

const {
  getAllActivities, getActivityById, addActivity, updateActivity, deleteActivity
} = require('../utils/fsUtils');
const validateToken = require('../middleware/validateToken');
const validateName = require('../middleware/validateName');
const validatePrice = require('../middleware/validatePrice');
const { validateDescription, validateRating, validateDifficulty, validateCreatedAt } = require('../middleware/validateDescription');

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

router.post('/', validateToken, validateName, validatePrice,
validateDescription, validateRating, validateDifficulty,
validateCreatedAt, async (req, res) => {
  const newActivity = req.body;

  await addActivity(newActivity);

  return res.status(201).json({ message: 'Atividade registrada com sucesso!' });
});

router.put('/:id', validateToken, validateName, validatePrice,
  validateDescription, validateRating, validateDifficulty,
  validateCreatedAt, async (req, res) => {
  const { id } = req.params;
  const updatedActivity = await updateActivity(Number(id), req.body);

  if (updatedActivity === null) {
    return res.status(404).json({ message: 'Atividade não encontrada' });
  }

  return res.status(200).json({
    message: 'Atividade atualizada com sucesso!',
  });
});

router.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;

  await deleteActivity(Number(id));

  return res.status(204).end();
});

module.exports = router;