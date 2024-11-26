import jwt from "jsonwebtoken";

const cartAuth = async (req,res,next) =>{
    try {
         const {token} = req.headers

         if(!token){
            return res.json({succes:false,message:"not Authorized please login again"})
         }
         const token_decode= jwt.verify(token,process.env.JWT_SECRET);
         req.body.userId =token_decode.id;
         next()


    } catch (error) {
         res.json({succes:false,message:error.message})
    }
}
export default cartAuth;