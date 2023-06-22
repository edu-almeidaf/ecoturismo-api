const validateEmail = (req, res, next) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const validateOthersFields = (req, res, next) => {
  const { password, firstName, phone } = req.body;
  
  if (!password) {
    return res.status(401).json({
      message: 'O campo "password" é obrigatório!'
    });
  }

  if (!firstName) {
    return res.status(401).json({
      message: 'O campo "firstName" é obrigatório!'
    });
  }

  if (!phone) {
    return res.status(401).json({
      message: 'O campo "phone" é obrigatório!'
    });
  }

  next();
}

module.exports = {
  validateEmail,
  validateOthersFields,
};