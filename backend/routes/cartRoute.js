import express from "express";
import { addToCart,updateCart,getUserCart } from "../controllers/cartContoller.js";
import cartAuth from "../Middleware/auth.js";
const cartRouter =express.Router();

cartRouter.post("/add",cartAuth,addToCart)
cartRouter.post("/update",cartAuth,updateCart)
cartRouter.post("/get",cartAuth,getUserCart);

export default cartRouter