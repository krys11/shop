const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  try {
    let userList = await User.find().select("-passwordHash");
    if (!userList) {
      res.status(500).json({ success: false });
    } else {
      res.send(userList);
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send("id invalid");
  }

  let user;
  try {
    user = await User.findById(req.params.id).select("-passwordHash");
    if (!user) {
      res.status(500).json({ success: false });
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

router.get(`/get/count`, async (req, res) => {
  let userCount;
  try {
    userCount = await User.countDocuments();
  } catch (error) {
    res.status(500).json({ success: false });
  }
  res.send({ userCount: userCount });
});

router.post("/login", async (req, res) => {
  let user;
  try {
    user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).send("User not found");
    } else {
      if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const secret = process.env.SECRET;
        const token = jwt.sign(
          {
            userId: user.id,
            isAdmin: user.isAdmin,
          },
          secret,
          { expiresIn: "1d" }
        );
        res.status(200).send({ email: user.email, token: token });
      } else {
        res.status(400).send("Password Wrond");
      }
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

router.post("/", async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });

  try {
    user = await user.save();
  } catch (error) {
    return res.status(400).send("User can not be created");
  }

  res.send(user);
});

router.delete("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send("id invalid");
  }

  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      res.status(200).json({ success: true, message: "User as been deleted" });
    } else {
      res.status(404).json({ success: false, message: "User as not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
});

module.exports = router;
