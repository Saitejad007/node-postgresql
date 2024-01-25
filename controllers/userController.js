const bcrypt = require("bcryptjs");
const db = require("../db");
const jwt = require("jsonwebtoken");

const User = db.users;

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);
    const user = await User.create({
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: hashedPwd,
    });
    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 1000,
      });
      res.cookie("jwt", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
      res.status(201).json(user);
    } else {
      res.status(409).send("User already exists");
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
        res.status(201).json(user);
      } else {
        res.status(401).send("Wrong Password");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { register, login };
