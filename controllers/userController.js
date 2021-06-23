const config = require('config')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const User = require('../models/User')


const createUser = async (req, res) => {
   const errors = validationResult(req)
   if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) })
   }

   const { name, email, password } = req.body

   try {
      // check if email is already in db
      let user = await User.findOne({ email })
      
      if (user) {
         return res.status(400).json('User already exists with this email address')
      }

      user = new User({ name, email })

      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      
      await user.save()

      const payload = {
         user: {
            id: user.id
         }
      }
      
      jwt.sign(payload, config.get('jwtSecret'), {
         expiresIn: 36000
      }, (err, encoded)=>{
         if (err) throw err

         res.send({ encoded })
      })
      
   } catch (err) {
      console.error(err)
      res.status(500).send()
   }

}

const sendAuthenticatedUser = async (req, res)=>{
   const user = await User.findById(req.user.user.id).select('-password')   
   res.send(user)
}

module.exports = {
   createUser,
   sendAuthenticatedUser
}