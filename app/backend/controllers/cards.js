const Card = require('../models/card');
const BadRequestError = require('../middlewares/errors/BadRequestError');
const NotFoundError = require('../middlewares/errors/NotFoundError');
// const AuthorizationError = require('../middlewares/errors/AuthorizationError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).res.send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch(next);
};

const deleteCardById = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      const ownerId = card.owner.toString();
      if (!card) {
        throw new NotFoundError('Card not found');
      } else if (ownerId !== req.user._id) {
        throw new BadRequestError('You are not authorized to delete this card');
      }
      res.status(200).send({ data: card });
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        throw new NotFoundError('Card not found');
      }
    })
    .catch(next);
};

const unlikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        throw new NotFoundError('Card not found');
      }
    })
    .catch(next);
};

module.exports = {
  getCards, createCard, deleteCardById, likeCard, unlikeCard,
};
