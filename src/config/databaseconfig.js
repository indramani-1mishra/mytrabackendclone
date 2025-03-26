const mongoose = require('mongoose')
const { MONGO_URL } = require('./serverconfig')

 const connectdatabase = async()=>
 {   try
    {
        await mongoose.connect(MONGO_URL);

        console.log("mongodb connected successfully");
    }
    catch(error)
    {
     console.log("did not connect database"+error);
    }
    

 }

 module.exports=connectdatabase;