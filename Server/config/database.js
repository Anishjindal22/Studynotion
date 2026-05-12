const mongoose = require('mongoose')
require('dotenv').config()

exports.connectDB = () => {
    const mongoUrl = process.env.MONGODB_URL

    if (!mongoUrl) {
        console.error("MONGODB_URL is missing in environment configuration")
        process.exit(1)
    }
    mongoose.connect(mongoUrl, {
        useUnifiedTopology:true,
        useNewUrlParser: true
    })
    .then(()=>{
        console.log("DB connection success")
    })
    .catch( (error) => {
        console.error("DB connection failed:", error.message);
        process.exit(1);
    } )
}