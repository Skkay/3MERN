const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const tokenDuration = 24 * 3600 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: tokenDuration,
  });
};

module.exports.signUp = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  try {
    const user = await UserModel.create({
      email,
      firstName,
      lastName,
      password,
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    res.status(400).send({ err });
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);

    res.cookie("jwt", token, { httpOnly: true, maxAge: tokenDuration });
    res.status(200).json({ token: token });
  } catch (err) {
    res.status(400).send({ err });
  }
};

module.exports.logOut = (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, maxAge: 0 });
  res.redirect("/");
};
