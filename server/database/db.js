const mongoose= require('mongoose')
const URI = process.env.MONGO_URI;
// console.log('the uri is',URI)
const connectToDb= async()=>{
    try {
        await mongoose.connect(URI)
        console.log('connection is successfull with mongodb/database')
    } catch (error) {
        console.error('Failed to connect to the database');
        console.error(`Error: ${error.message}`);
    }
}
module.exports= connectToDb