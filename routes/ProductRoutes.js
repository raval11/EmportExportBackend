const express = require("express");
const {AddProduct, GetProduct, GetOneProduct, GetProductByCategory, DeleteProduct} = require("../controller/ProductController");
const ProductRoute = express();
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const auth = require("../middleware/auth");

ProductRoute.use(express.json());
ProductRoute.use(bodyParser.urlencoded({extended: true}));
ProductRoute.use(bodyParser.json());
ProductRoute.use(express.static("public"));
ProductRoute.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,path.join(__dirname, "../public/Product"), (error, success) => {
            console.log(error);
        });
    },
    filename: (req, file, cb) => {
        const FileName = Date.now() + "-" + file.originalname;
        cb(null, FileName, (error, success) => {
            console.log(error);
        });
    },
});

const uplode = multer({storage: storage});

ProductRoute.post("/AddProduct", uplode.array("productImage",5), AddProduct);
ProductRoute.get("/GetProduct",GetProduct)
ProductRoute.post("/GetOneProduct",GetOneProduct)
ProductRoute.post("/GetProductByCategory",GetProductByCategory)
ProductRoute.post("/DeleteProduct",auth,DeleteProduct)

module.exports = ProductRoute;
