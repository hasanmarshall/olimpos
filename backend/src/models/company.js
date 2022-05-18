const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  phoneNumber: {
    type: Number,
    unique: true,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  bio: String,
  addresses: [],
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      autopopulate: true,
    },
  ],
  photo: String,
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: { maxDepth: 1 },
    },
  ],
})

class Company {
  async addAddress(address) {
    this.addresses.push(address)
    await this.save()
  }

  async getAddresses() {
    return this.addresses
  }

  async showEvent(event) {
    this.shows.push(event)
    event.shownBy.push(this)
  }
}

companySchema.loadClass(Company)
companySchema.plugin(autopopulate)

module.exports = mongoose.model('Company', companySchema)
