const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  bio: String,
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
})

class User {
  async addEvent(event) {
    this.events.push(event)
    await this.save()
  }

  async likeEvent(event) {
    this.likes.push(event)
    event.likedBy.push(this)

    await event.save()
    await this.save()
  }
}

userSchema.loadClass(User)
userSchema.plugin(autopopulate)

module.exports = mongoose.model('User', userSchema)
