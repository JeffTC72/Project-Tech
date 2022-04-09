const mongoose = require('mongoose');

const connectDB = () => {
    try{
        mongoose.connect(process.env.CONNECTION_STRING,{
            useNewUrlParser: true,
            useUnifiedTopology:true
        });
        console.log('DB - connected')
    }catch(err){
        console.log('error', err)
        throw err;
    }
}

module.exports = connectDB;