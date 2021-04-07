const UserModel = require("../models/user.model");

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
