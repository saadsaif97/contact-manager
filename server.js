const express = require('express');
const { connectDB } = require('./config/db');

const app = express();

// connectDB
connectDB()

// middleware
app.use(express.json())


// routes
app.use('/api/users', require('./routes/userRoute'));


// port
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()  => console.log(`Server started on port ${PORT}`));