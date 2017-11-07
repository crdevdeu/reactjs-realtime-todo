const idValidator = (req, res, next) => {
  const paramsId = req.params.id;
  const id = parseInt(paramsId, 10);
  const isIdNumber = !Number.isNaN(id);

  if (isIdNumber) {
    next();
  } else {
    res.status(400).json({
      message: 'Bad request.',
    });
  }
};

module.exports = {
  idParamValidator: idValidator
};

