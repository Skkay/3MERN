const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const axios = require("axios");

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

module.exports.getFavoriteCitiesWeatherData = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("Unknown user id: " + req.params.id);
  }

  try {
    const favoriteCities = await UserModel.findById(req.params.id).select("favoriteCities");
    const data = await getFavoriteCitiesDataFromApi(favoriteCities.favoriteCities);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send({ err });
  }
}

async function getFavoriteCitiesDataFromApi(ids) {
  const data = [];

  for (const id of ids) {
    await axios({
      method: "GET",
      url: `http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${process.env.OPEN_WEATHER_API_KEY}`
    })
    .then((res) => {
      data.push(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  return data;
}

module.exports.isFavoriteCity = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("Unknown user id: " + req.params.id);
  }

  try {
    const favoriteCities = await UserModel.findById(req.params.id).select("favoriteCities");
    let isFavoriteCity = false;
    if (favoriteCities.favoriteCities.includes(req.params.cityId)) {
      isFavoriteCity = true;
    }
    res.status(200).json({isFavoriteCity: isFavoriteCity});
  } catch (err) {
    res.status(400).send({ err });
  }
}
