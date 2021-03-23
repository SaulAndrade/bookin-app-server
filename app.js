const express = require('express')
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const Event = require('./models/event')
const User = require('./models/users')

const app = express()

app.use( bodyParser.json() )

app.get('/', (req, res, next)=>{
    res.send("Hello")
})

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type User {
            _id: ID!
            password: String
            email: String!
        }

        input UserInput {
            password: String!
            email: String!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return Event.find()
            .then(events => {
                return events.map(event=>{
                    return {...event._doc}
                })
            })
            .catch(err=>{
                console.log(err);
            })
        },
        createEvent: (args) => {
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date(args.eventInput.date),
                creator: '605959a64c46f1e8985a4198'
            })
            let createdEvent = null
            return event.save()
            .then(res => {
                createdEvent = {...res._doc}
                return User.findOne({_id: '605959a64c46f1e8985a4198'})
            })
            .then(user=>{
                if (!user){
                    throw new Error('User not found.')
                }
                user.createdEvents.push(event)
                return user.save()
            })
            .then(res => {
                return createdEvent
            })
            .catch(err=> {
                console.log(err);
                throw err
            })
        },
        createUser: (args) => {
            return User.findOne({email:args.userInput.email})
            .then(user=>{
                if (user){
                    throw new Error('User already exists.')
                }
                return bcrypt.hash(args.userInput.password, 12)
            })
            .then(hashedPassword => {
                const user = new User({
                    email: args.userInput.email,
                    password: hashedPassword
                })
                return user.save()
                .then(res => {
                    console.log(res)
                    return {...res._doc, password: null}
                })
                .catch(err=> {
                    console.log(err);
                    throw err
                })
            })
            .catch(err=>{
                throw err
            })
        }
    },
    graphiql: true
}))

mongoose.connect(`mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PWD}@cluster0.yecy6.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
.then(()=>{
    app.listen(3000)
})
.catch(err => {
    console.log(err)
})
