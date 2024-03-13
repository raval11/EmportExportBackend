const ProductModel = require("../model/ProductModel");


const AddProduct = async(req,res) => {
    try{
            console.log( req.body.Category)
        const ArrayImage = [];
        for(let i = 0 ; i < req.files.length ; i++){
            ArrayImage[i] =  req.files[i].filename
        }

            const ProductAdd = new ProductModel({
                ProductName : req.body.ProductName,
                Category : req.body.Category,
                Discription : req.body.Discription,
                productImage : ArrayImage
            })

            const Product = await ProductAdd.save()
            res.status(200).json({success:true ,Product : Product})

    }catch(error){
        res.status(500).json({success:false,message: error.message});
    }
}

const GetProduct = async(req,res) =>{
    try{
        const Product = await ProductModel.find({})
        res.status(200).json({success:true,Product : Product})

    }catch(error){
        res.status(500).json({success:false,message: error.message});
    }
}

const DeleteProduct = async(req,res) =>{
    try{
        console.log(req.body)
        const product =  await ProductModel.deleteOne({_id : req.body._id})
        res.status(200).json({success:true,message : "Delete Product SuccessFully" ,product})

    }catch(error){
        res.status(500).json({success:false,message: error.message});
    }
}

const GetOneProduct = async(req,res) =>{
    try{
        const id = req.body._id
        const Product = await ProductModel.findOne({_id : id})
        res.status(200).json({success:true,Product})

    }catch(error){
        res.status(500).json({success:false,message: error.message});
    }
} 

const GetProductByCategory = async(req,res) =>{
    try{
        const Category = req.body.Category
        const Product = await ProductModel.find({Category : Category})
        res.status(200).json({success:true,Product})

    }catch(error){
        res.status(500).json({success:false,message: error.message});
    }
}





module.exports = {
    AddProduct,
    GetProduct,
    GetOneProduct,
    GetProductByCategory,
    DeleteProduct
}