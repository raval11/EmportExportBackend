const mongoose = require('mongoose');

const ImageLimitError = (value) =>{
    return value.length  <= 5 
}

const ProductSchema = mongoose.Schema({
    ProductName : {
        type : String,
        required : true
    },
    Category : {
        type : String,
        required : true
    },
    Discription : {
        type : String,
        required : true
    },
    productImage:{
        type : Array,
        required : false,
        validate : [ImageLimitError,"You can pass only 5 image"]
    }
})

module.exports = mongoose.model("Product",ProductSchema);

