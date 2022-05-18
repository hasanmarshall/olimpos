const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const eventSchema = new mongoose.Schema({
  eventName: String,
  shownBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      autopopulate: true,
    },
  ],
})

eventSchema.plugin(autopopulate)
module.exports = mongoose.model('Event', eventSchema)
