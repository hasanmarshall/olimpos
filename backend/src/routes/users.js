const express = require("express");

const router = express.Router();

const User = require("../models/user");
const Photo = require("../models/photo");

/* GET users listing. */
router.get("/", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

/* POST create a user */
router.post("/", async (req, res) => {
  const createdUser = await User.create(req.body);
  res.send(createdUser);
});

router.get("/initialize", async (req, res) => {
  const mihri = await User.create({
    name: "mihri",
    age: 35,
    email: `mihri@example.com`,
  });
  const armagan = await User.create({
    name: "armagan",
    age: 36,
    email: `armagan@example.com`,
  });

  const steve = await User.create({
    name: "steve",
    age: 21,
    email: `steve@example.com`,
  });

  mihri.setPassword("test");
  armagan.setPassword("test");
  steve.setPassword("test");

  res.sendStatus(200);
});

router.post("/:userId/adds", async (req, res) => {
  const user = await User.findById(req.params.userId);
  const photo = await Photo.findById(req.body.photoId);

  await user.addPhoto(photo);
  res.sendStatus(200);
});

router.post("/:userId/likes", async (req, res) => {
  const user = await User.findById(req.params.userId);
  const photo = await Photo.findById(req.body.photoId);

  await user.likephoto(photo);
  res.sendStatus(200);
});

router.get("/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (user) res.render("user", { user });
  else res.sendStatus(404);
});

router.get("/:userId/json", async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.send(user);
});

module.exports = router;
