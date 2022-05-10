const mongoose = require('mongoose');

const mongoURI="mongodb+srv://tushar123:tushar123@cluster0.gkai4.mongodb.net/Notes?retryWrites=true&w=majority";

const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Conected to mongoose");
    })
}

module.exports =connectToMongo;