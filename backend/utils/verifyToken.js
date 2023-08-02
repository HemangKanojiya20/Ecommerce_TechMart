const jwt = require("jsonwebtoken")

const verifyToken = async (req, res, next) => {

    const token = JSON.parse(req.headers.authorization.split(" ")[1]);
    
    if(!token){
        return res.status(401).json({success:false, message:"You are not authorized user"})
    }

  const verified = await  jwt.verify(token, process.env.JWT_SECRET_KEY)
  
   if(!verified){
    return res.status(401).json({success:false, message:"Token is invalid"})
   }

   req.user = verified
   next(); 
} 

module.exports = {
    verifyToken
}