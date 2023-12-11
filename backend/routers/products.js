const express = require("express");
const router = express.Router();
const { Product } = require("../models/product");
const { Category } = require("../models/category");
const mongoose = require("mongoose");
const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");

    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

router.get("/", async (req, res) => {
  let filter = {};
  let product;

  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }

  try {
    product = await Product.find(filter).populate("category"); //select("name, image");
  } catch (error) {
    res.status(500).json({ success: false });
  }

  res.send(product);
});

router.get(`/get/count`, async (req, res) => {
  let productCount;
  try {
    productCount = await Product.countDocuments();
  } catch (error) {
    res.status(500).json({ success: false });
  }
  res.send({ productCount: productCount });
});

router.get(`/get/featured`, async (req, res) => {
  let products;
  try {
    products = await Product.find({ isFeatured: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
  res.send({ products: products });
});

router.get(`/get/featured/:count`, async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  let products;
  try {
    products = await Product.find({ isFeatured: true }).limit(parseInt(count));
  } catch (error) {
    res.status(500).json({ success: false });
  }
  res.send(products);
});

router.get("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send("id invalid");
  }

  let product;
  try {
    product = await Product.findById(req.params.id).populate("category");
  } catch (error) {
    res.status(500).json({ success: false });
  }

  res.send(product);
});

router.post("/", uploadOptions.single("image"), async (req, res) => {
  try {
    await Category.findById(req.body.category);
  } catch (error) {
    return res.status(400).send("Category invalid");
  }

  const file = req.file;
  if (!file) return res.status(400).send("No image in the request");

  const fileName = file.filename;
  const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: `${basePath}${fileName}`, // "http://localhost:3000/public/upload/image-2323232"
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });

  try {
    product = await product.save();
  } catch (error) {
    return res.status(400).send("The product can not be created");
  }

  res.send(product);
});

router.put("/:id", async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);

  const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send("id invalid");
  }

  try {
    await Category.findById(req.body.category);
  } catch (error) {
    return res.status(400).send("Category invalid");
  }

  let product;
  try {
    product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: `${basePath}${req.body.image.name}`,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
      },
      { new: true }
    );
  } catch (error) {
    return res.status(500).send("The product can not be update");
  }

  res.status(200).send(product);
});

router.delete("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send("id invalid");
  }

  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      res
        .status(200)
        .json({ success: true, message: "Product as been deleted" });
    } else {
      res.status(404).json({ success: false, message: "Product as not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
});

module.exports = router;
