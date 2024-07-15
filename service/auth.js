const jwt=require("jsonwebtoken");
const secreat="sakshi$123"
function setUser(user){
    return jwt.sign({
        _id:user._id,
        email:user.email,
        role:user.role,
    },secreat);
}
function getUser(token){
    if(!token) return null; 
    try{
        return jwt.verify(token,secreat);
    }
    catch(error){
        return null;
    }
}
   
module.exports={
    setUser,
    getUser,
}