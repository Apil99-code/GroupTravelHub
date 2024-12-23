const mongoose = require('mongoose');

// MongoDB connection string

const connection =  async ()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        if(connect){
            console.log(`Database connected : ${connect.connection.host}`)
        }else{
            console.log('Database not connected')
        }
        

    } catch (error) {
        console.log(error)
    }
}


module.exports = connection




