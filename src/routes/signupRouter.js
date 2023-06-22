const express = require('express');
const { validateEmail, validateOthersFields } = require('../middleware/validateSignup');
const generateToken = require('../utils/generateToken');

const router = express.Router();

router.post('/', validateEmail, validateOthersFields, (_req, res) => {
  const token = generateToken();

  return res.status(200).json({ token });
});

module.exports = router;