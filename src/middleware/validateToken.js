const validateToken = (req, res, next) => {
  const { logintoken } = req.headers;

  if (!logintoken) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (logintoken.length !== 16 || typeof logintoken !== 'string') {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

module.exports = validateToken;