const express = require('express')
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')

const mySchema = require('./graphql/schema/index')
const myResolver = require('./graphql/resolvers/index')


const app = express()

app.use( bodyParser.json() )

app.get('/', (req, res, next)=>{
    res.send("Hello")
})

app.use('/graphql', graphqlHTTP({
    schema: mySchema,
    rootValue: myResolver,
    graphiql: true
}))

mongoose.connect(`mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PWD}@cluster0.yecy6.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
.then(()=>{
    app.listen(3000)
})
.catch(err => {
    console.log(err)
})
