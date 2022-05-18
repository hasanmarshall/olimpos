const express = require('express')

const router = express.Router()
const Event = require('../models/event')

/* POST create an event */
router.post('/', async (req, res) => {
  const createdEvent = await Event.create(req.body)
  res.send(createdEvent)
})

module.exports = router
