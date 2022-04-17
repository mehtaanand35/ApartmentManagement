const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");
const bycrpt = require("bcrypt");
const flat = require("./models/flatDetail.model");
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/apartment_management");
app.post("/api/register", async (req, res) => {
  try {
    const newPassword = await bycrpt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: "ok" });
  } catch (e) {
    res.json({ status: "error" });
  }
});

app.get("/api/detail", async (req, res) => {
  try {
    const dat = await flat.find().lean().exec();
    return res.status(201).send(dat);
  } catch (e) {
    res.json({ status: "error" });
  }
});

app.post("/api/detail", async (req, res) => {
  try {
    await flat.create({
      name: req.body.name,
      Type: req.body.Type,
      Block: req.body.Block,
      FlatNo: req.body.FlatNo,
    });
    res.json({ status: "ok" });
  } catch (e) {
    res.json({ status: "error" });
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return { status: "err", error: "Invalid Password" };
  }
  const isPasswordValid = await bycrpt.compare(
    req.body.password,
    user.password
  );
  if (user) {
    const token = jwt.sign(
      {
        name: User.name,
        email: User.email,
      },
      "secret123"
    );
    return res.json({ status: "ok", user: true });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.listen(8080, () => console.log("listening on port 8080"));
