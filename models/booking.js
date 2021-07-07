const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookinggSchema = new Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  },
   user: {
     type: Schema.Types.ObjectId,
     ref: 'User '
   }
}, {timestamps:true})

module.exports = mongoose.model('Booking', bookinggSchema)