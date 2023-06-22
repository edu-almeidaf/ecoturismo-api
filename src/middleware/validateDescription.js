const validateDescription = (req, res, next) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json(
      { message: 'O campo description é obrigatório' },
    );
  }

  next();
};

const validateRating = (req, res, next) => {
  const { rating } = req.body.description;
  
  if (rating === undefined) {
    return res.status(400).json(
      { message: 'O campo rating é obrigatório' },
    );
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return res.status(400).json(
      { message: 'O campo rating deve ser um número inteiro entre 1 e 5' },
    );
  }

  next();
};

const validateDifficulty = (req, res, next) => {
  const { difficulty } = req.body.description;
  const classifications = ['Fácil', 'Médio', 'Difícil'];
  
  if (!difficulty) {
    return res.status(400).json(
      { message: 'O campo difficulty é obrigatório' },
    );
  }

  if (!classifications.includes(difficulty)) {
    return res.status(400).json(
      { message: 'O campo difficulty deve ser \'Fácil\', \'Médio\' ou \'Difícil\'' },
    );
  }

  next();
};

const validateCreatedAt = (req, res, next) => {
  const { createdAt } = req.body.description;
  const isFormatDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  
  if (!createdAt) {
    return res.status(400).json(
      { message: 'O campo createdAt é obrigatório' },
    );
  }

  if (!isFormatDate.test(createdAt)) {
    return res.status(400).json(
      { message: 'O campo createdAt deve ter o formato \'dd/mm/aaaa\'' },
    );
  }

  next();
};

module.exports = {
  validateDescription,
  validateRating,
  validateDifficulty,
  validateCreatedAt,
};