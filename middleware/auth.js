const jwt = require('jsonwebtoken')
const config = require('config')


const auth = (req, res, next)=>{
   const { 'x-auth-token':token } = req.headers

   if(!token){
      return res.status(301).send('Unauthorized')
   }

   const user = jwt.verify(token, config.get('jwtSecret'))
   req.user = user
   next()

}

module.exports = { auth }