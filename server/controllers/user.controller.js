const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.addToFavorite = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("Unknown user id: " + req.params.id);
  }

  try {
    await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { favoriteCities: req.body.cityId }
      },
      {
        new: true, upsert: true
      },
      (err, doc) => {
        if (!err) {
          res.status(204).json(doc)
        } else {
          res.status(400).send({ err });
        }
      }
    );
  } catch (err) {
    res.status(400).send({ err });
  }
}

module.exports.removeFromFavorite = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("Unknown user id: " + req.params.id);
  }

  try {
    await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { favoriteCities: req.body.cityId }
      },
      { new: true, upsert: true },
      (err, doc) => {
        if (!err) {
          res.status(204).json(doc)
        } else {
          res.status(400).send({ err });
        }
      }
    );
  } catch (err) {
    res.status(400).send({ err });
  }
}

module.exports.getFavoriteCities = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("Unknown user id: " + req.params.id);
  }

  try {
    const favoriteCities = await UserModel.findById(req.params.id).select("favoriteCities");
    res.status(200).json(favoriteCities);
  } catch (err) {
    res.status(400).send({ err });
  }
}
