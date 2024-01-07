const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
},
  number: {
    type: String,
    required: true,
    validate: function(value) {
        const parts = value.split('-')
        if (parts.length !== 2) {
            return false
        }
        if (parts[0].length !== 2 && parts[0].length !== 3) {
            return false
        }
        return true
        const firstPartIsNumber = /^\d+$/.test(parts[0]);
        const secondPartIsNumber = /^\d+$/.test(parts[1]);

        return firstPartIsNumber && secondPartIsNumber;
    }
}
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)