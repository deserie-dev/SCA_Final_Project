const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const {
  getCards, createCard, deleteCardById, likeCard, unlikeCard,
} = require('../controllers/cards');

function validateUrl(string) {
  if (!validator.isURL(string)) {
    throw new Error('Invalid URL');
  }
  return string;
}

cardsRouter.get('/', getCards);

cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateUrl),
  }),
}), createCard);

cardsRouter.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex(),
  }),
}), deleteCardById);

cardsRouter.put('/likes/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex(),
  }),
}), likeCard);

cardsRouter.delete('/likes/:id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex(),
  }),
}), unlikeCard);

module.exports = cardsRouter;
