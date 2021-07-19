const Event = require('../../models/event')
const User = require('../../models/users')
const { transformEvent } = require('./merge')

module.exports = {
    events: async () => {
        try {
            const events = await Event.find()
            return events.map(event=>{
                return { ...event._doc , date: new Date(event._doc.date).toISOString(), _id:event.id }
            })
        }
        catch(err){
            throw err;
        }
    },

    createEvent: async (args, req) => {
        if(!req.isAuth){
            throw new Error('unauthenticated!')
        }

        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: req.userId
        })
        let createdEvent = null
        try{
            const res = await event.save()
            createdEvent = transformEvent(res)

            const creator = await User.findOne({_id: req.userId})
            if (!creator){
                throw new Error('User not found.')
            }
            creator.createdEvents.push(event)

            await creator.save()
            return createdEvent

        }
        catch(err) {
            console.log(err);
            throw err
        }
    },

    deleteEvent: async (args, req) => {
        if(!req.isAuth){
            throw new Error('unauthenticated!')
        }

        const event = await Event.findOne({_id: args.eventId})
        
        if(String(event.creator) !== req.userId){ 
            throw new Error('event belongs to another user!')
        }

        const result = await Event.deleteOne({_id: args.eventId})

        return transformEvent(event)
    }
}