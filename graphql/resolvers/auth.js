const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/users')
const { events } = require('./merge')


module.exports = {
    login: async (args) => {
        const user = await User.findOne({email:args.email})
        if (!user){
            throw new Error('user does not exist')
        }

        const passCheck = await bcrypt.compare(args.password, user.password)
        if (!passCheck){
            throw new Error('password does not match')
        }

        const token = jwt.sign(
            {
                userId:user.id,
                email:user.email
            }, 
            'somesupersecretkey',
            {
                expiresIn:'1h'        
            }
        )

        const authData = {
            userId: user.id,
            token: token,
            tokenExpiration: 1
        }

        return authData
    },

    users: async () => {
        try {
            const users = await User.find()
            return users.map(user=>{
                return { ...user._doc, _id:user.id, createdEvents:()=>{events(user.createdEvents)}}
            })
        }
        catch(err){
            throw err
        }
    },

    createUser: async (args) => {
        try {
            const existingUser = await User.findOne({email:args.userInput.email})   
            if (existingUser){
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