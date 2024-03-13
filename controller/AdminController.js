const AdminModel = require("../model/AdminModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SecurePassword = async (password) => {
    const HasePassword = await bcryptjs.hash(password, 10);
    return HasePassword;
};

const createToken = async({id}) =>{
   const token =  jwt.sign(id,process.env.SECRATE_KEY)
   return token
}

const Register = async (req, res) => {
    try {
        const password = await SecurePassword(req.body.password);
        const AdminData = new AdminModel({
            name: req.body.name,
            email: req.body.email,
            password: password,
        });
        const data = await AdminData.save();
        res.status(200).send({success: true, message: "Admin Ragister SuccessFully", data: data});
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
};

const login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const admin = await AdminModel.findOne({email: email});
        if (admin) {
            const comparePassword = await bcryptjs.compare(password, admin.password);
            if (comparePassword) {
                const token = await createToken(admin._id)
                res.status(200).send({success: true,login:true , message : "Login Successfully",chatgpt:token});
            } else {
                res.status(404).send({success: false, message: "Password is Wrong"});
            }
        } else {
            res.status(404).send({success: false, message: "Admin Not found"});
        }
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
};

module.exports = {
    Register,
    login,
};
