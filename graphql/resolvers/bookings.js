const Booking = require('../../models/booking')
const Event = require('../../models/event')

const { singleEvent, user, transformBooking } = require ('./merge')

module.exports = {
    bookings: async (args, req) => {
        if(!req.isAuth){
            throw new Error('unauthenticated!')
        }

        try {
            const bookings = await Booking.find()
            return bookings.map(booking => transformBooking(booking))
        }
        catch(err) {
            throw err
        }
    },

    bookEvent: async (args, req) => {
        if(!req.isAuth){
            throw new Error('unauthenticated!')
        }

        try{
            const user = await User.findById(req.userId)
            const event = await Event.findById(args.eventId)

            const booking = new Booking({
                event: event,
                user: user
            })

            const result = await booking.save()
            return transformBooking(result) 
        }
        catch(err) {
            throw err
        }


    },

    cancelBooking: async (args, req) => {
        if(!req.isAuth){
            throw new Error('unauthenticated!')
        }

        try {
            const booking = await Booking.findById(args.bookingId).populate('event')
            if(String(booking.user.id) !== req.userId){ 
                throw new Error('booked by another user!')
            }
            const event = transformEvent(booking._doc.event)
            await Booking.deleteOne({_id:args.bookingId})
            return event
        }
        catch(err) {
            throw err
        }

    }
}