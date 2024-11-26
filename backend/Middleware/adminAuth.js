import jwt from "jsonwebtoken";

const adminAuth = async (req,res,next) =>{
    try {
         const {token} = req.headers

         if(!token){
            return res.json({succes:false,message:"not Authorized please login again"})
         }
         const token_decode= jwt.verify(token,process.env.JWT_SECRET);
         if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({succes:false,message:"not Authorized please login again"})
         }
         next()


    } catch (error) {
         res.json({succes:false,message:error.message})
    }
}
export default adminAuth;