const mongoose = require('mongoose');


const InquarySchema = mongoose.Schema({
    name :{
        type: String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    phone : {
        type : String,
        require : true
    },
    contry : {
        type : String,
        require : true
    },
    question : {
        type : String,
        require : true
    }
})


module.exports = mongoose.model("Inquary",InquarySchema)
