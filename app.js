const express = require('express')
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')

const isAuth = require('./middleware/isAuth')
const mySchema = require('./graphql/schema/index')
const myResolver = require('./graphql/resolvers/index')

const app = express()

app.use( bodyParser.json() )

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '* ')
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')

    if (req.method === 'OPTIONS'){
        return res.sendStatus(200)
    }
    next() 
}) 

app.use(isAuth)

app.get('/', (req, res, next)=>{
    res.send("Hello")
})

app.use('/graphql', graphqlHTTP({
    schema: mySchema,
    rootValue: myResolver,
    graphiql: true
}))

mongoose.connect(`mongodb://127.0.0.1:27017/test`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user:'saul', 
    pass:'testPwd'
})
.then(()=>{
    app.listen(3001)
})
.catch(err => {
    console.log(err)
})
