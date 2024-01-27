const bcrypt = require("bcryptjs");
const db = require("../db");
const jwt = require("jsonwebtoken");

const User = db.users;

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      res.status(409).send({
        message: "User with this email already exists",
        status: 409,
      });
    } else {
      const user = await User.create({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: hashedPwd,
      });
      const token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 1000,
      });
      res.cookie("jwt", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
      res.status(201).json({ user });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign({ id: user.id }, process.env.SECRET, {
          expiresIn: 60 * 60 * 1000,
        });
        res.cookie("jwt", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        const { password, ...others } = user.dataValues;
        res.status(200).json(others);
      } else {
        res.status(401).send({
          message: "Invalid credentials",
          status: 401,
        });
      }
    } else {
      res
        .status(404)
        .send({ message: "User with this email does not exist", status: 404 });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { register, login };
