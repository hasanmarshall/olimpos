const mongoose = require('mongoose')

const username = process.env.MONGODB_USERNAME
const password = process.env.MONGODB_PASSWORD
const dbName = process.env.MONGODB_DATABASE
let connectionString = process.env.MONGODB_CONNECTION_STRING

if (!connectionString) {
  connectionString = `mongodb+srv://root:eXcPQLjYeW3OIn5p@cluster0.tdb5d.mongodb.net/hasan?retryWrites=true&w=majority`
}

mongoose.set('debug', true)

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connection established'))
  .catch(console.log)

module.exports = mongoose.connection
