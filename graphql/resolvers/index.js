const bcrypt = require('bcryptjs')

const Event = require('../../models/event')
const User = require('../../models/users')

const events = async (eventIds) => {
    try {
        const events = await Event.find({_id: {$in: eventIds}})
        return events.map(event=>{
            return { 
                    ...event,
                    date: new Date(event._doc.date).toISOString(), 
                    creator: user.bind(this, event.creator)}
        })
    }
    catch(err){
        throw err
    }
}

const user = userId => {
    User.findById(userId)
    .then(user => {
        return { ...user._doc, _id: user.id, createdEvents: events.bind(this, user._doc.createdEvents) }
    })
}

module.exports = {
    events: async () => {
        try {
            const events = await Event.find().populate('creator')
            return events.map(event=>{
                return { ...event._doc , date: new Date(event._doc.date).toISOString()}
            })
        }
        catch(err){
            throw err;
        }
    },
    createEvent: async (args) => {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '605959a64c46f1e8985a4198'
        })
        let createdEvent = null
        try{
            const res = await event.save()
            createdEvent = {...res._doc, date: new Date(res._doc.date).toISOString()}

            const creator = await User.findOne({_id: '605959a64c46f1e8985a4198'})
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
    createUser: async (args) => {
        try {
            const existingUser = await User.findOne({email:args.userInput.email})   
            if (user){
                throw new Error('User already exists.')
            }

            const hashedPassword = await bcrypt.hash(args.userInput.password, 12)

                const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            })

            const res = await user.save()

            return {...res._doc, password: null}
        }
        catch(err){
            throw err
        }
    }
}