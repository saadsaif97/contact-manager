const mongoose = require('mongoose')
const config = require('config')

const db = config.get('mongoURI')

const connectDB = async ()=>{
   try {
      mongoose.connect(db,{
         useUnifiedTopology: true,
         useNewUrlParser: true
      })

      console.log("Connected to db");
   } catch (err) {
      console.error('Not connected to DB');
      process.exit(1)
   }

}

module.exports = { connectDB }