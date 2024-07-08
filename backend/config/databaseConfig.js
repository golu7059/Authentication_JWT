const mongoose = require('mongoose')
const MONGODB_URL = process.env.MONGODB_URL;

const connectToDB = async () => {
    try{
       const conn =  await mongoose.connect(MONGODB_URL);
       console.log(`connected to database : ${conn.connection.host}`);
    }catch(error){
        console.log("unable to connect to db : " , error);
    }
}

module.exports = connectToDB;