const express = require("express");
const router = express.Router();
const { Category } = require("../models/category");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  let categoryList;
  try {
    categoryList = await Category.find();
  } catch (error) {
    res.status(500).json({ success: false });
  }
  res.send(categoryList);
});

router.get("/:id", async (req, res) => {
  let category;
  try {
    category = await Category.findById(req.params.id);
  } catch (error) {
    res.status(500).json({ success: false });
  }
  res.send(category);
});

router.post("/", async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });

  try {
    category = await category.save();
  } catch (error) {
    res.status(505).send("Création de catégorie impossible");
  }

  res.send(category);
});

router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send("id invalid");
  }

  let category;
  try {
    category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
      },
      { new: true }
    );
  } catch (error) {
    return res.status(400).send("The category can not be created");
  }

  res.send(category);
});

router.delete("/:id", (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send("id invalid");
  }

  Category.findByIdAndDelete(req.params.id)
    .then((category) => {
      if (category) {
        res
          .status(200)
          .json({ success: true, message: "Category as been deleted" });
      } else {
        res
          .status(404)
          .json({ success: false, message: "Category as not found" });
      }
    })
    .catch((er) => {
      res.status(400).json({ success: false, er: er });
    });
});

module.exports = router;
