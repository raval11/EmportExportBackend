const jwt = require("jsonwebtoken")

const auth = async(req,res,next) =>{
    const token = req.body.token || req.query.token || req.headers['authorization']
      if(!token){
        res.status(404).send({success:false,message:"Token is require for Authontication"})
      }
      try{
        const decode = jwt.verify(token,process.env.SECRATE_KEY)
        req.user = decode
        console.log(decode)
        return next()
        
      }catch(error){
        res.status(500).json("Invalid Token")
      }

      
}

module.exports = auth