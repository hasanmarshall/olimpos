const express = require('express')

const router = express.Router()

const User = require('../models/user')
const Event = require('../models/event')

/* GET users listing. */
router.get('/', async (req, res) => {
  const query = {}

  if (req.query.name) {
    query.name = req.query.name
  }

  if (req.query.age) {
    query.age = req.query.age
  }

  res.send(await User.find(query))
})

/* POST create a user */
router.post('/', async (req, res) => {
  const userToCreate = {
    name: req.body.name,
    age: req.body.age,
  }

  const createdUser = await User.create(userToCreate)
  res.send(createdUser)
})

router.get('/initialize', async (req, res) => {
  const ahmet = await User.create({ name: 'ahmet', age: 35 })
  const ali = await User.create({ name: 'ali', age: 36 })

  const hakan = await User.create({ name: 'hakan', age: 21 })
  hakan.bio = 'A great English as a second language tutor'
  hakan.save()

  const babyShower = await Event.create({ filename: 'Baby Shower' })
  const firstTooth = await Event.create({ filename: 'First Tooth Party' })

  await hakan.addEvent(babyShower)
  await hakan.addEvent(firstTooth)

  await ali.likeEvent(babyShower)
  await ahmet.likeEvent(firstTooth)

  // eslint-disable-next-line no-console
  console.log(hakan)
  res.sendStatus(200)
})

router.post('/:userId/adds', async (req, res) => {
  const user = await User.findById(req.params.userId)
  const event = await Event.findById(req.body.eventId)

  await user.addEvent(event)
  res.sendStatus(200)
})

router.post('/:userId/likes', async (req, res) => {
  const user = await User.findById(req.params.userId)
  const event = await Event.findById(req.body.eventId)

  await user.likeEvent(event)
  res.sendStatus(200)
})

router.get('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId)

  if (user) res.send(user)
  else res.sendStatus(404)
})

router.get('/:userId/json', async (req, res) => {
  const user = await User.findById(req.params.userId)
  res.send(user)
})

module.exports = router
