const User = require('../../models/users')
const Event = require('../../models/event')
const Booking = require('../../models/booking')

const user = async (userId) => {
    try {
        const user = await User.findById(userId)
        return { ...user._doc, _id: user.id, createdEvents: events.bind(this, user._doc.createdEvents) }
    }
    catch (err) {
        throw err
    }
}

const events = async (eventIds) => {
    try {
        const events = await Event.find({_id: {$in: eventIds}})
        return events.map(event => transformEvent(event))
    }
    catch(err){
        throw err
    }
}
const singleEvent = async (eventId) => {
    try {
        const event = await Event.findById(eventId)
        return transformEvent(event)
    }
    catch(err){
        throw err
    }
}

const singleBooking = async (bookingId) => {
    try {
        const booking = await Booking.findById(bookingId)
        return transformBooking(booking)
    }
    catch(err){
        throw err
    }
}

const transformEvent = event => {
    return {
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date).toISOString(), 
        creator: user.bind(this, event.creator)
    }
}

const transformBooking = booking => {
    return {
        ...booking._doc,
        _id: booking.id,
        event: () => singleEvent(booking._doc.event),
        user: () => user(booking._doc.user),
        createdAt: new Date(booking._doc.createdAt).toISOString(), 
        updatedAt: new Date(booking._doc.updatedAt).toISOString()
    }
}

exports.user = user
exports.events = events
exports.singleEvent = singleEvent
exports.transformEvent = transformEvent
exports.transformBooking = transformBooking
exports.singleBooking = singleBooking
