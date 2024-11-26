import express from "express";
import {placeOrder , placeOrderStripe ,userOrders , AllOrders ,updateStatus, verifyStripe } from "../controllers/orderControler.js";
import cartAuth from "../Middleware/auth.js";
import adminAuth from "../Middleware/adminAuth.js";
const orderRouter =express.Router();
 // Admin Features
 orderRouter.post("/list",adminAuth,AllOrders)
 orderRouter.post("/status",adminAuth,updateStatus)
// Payment Features
 orderRouter.post("/place",cartAuth,placeOrder)
 orderRouter.post("/stripe",cartAuth,placeOrderStripe)
 orderRouter.post("/verify",cartAuth,verifyStripe)
// User Feature
orderRouter.post('/userorders',cartAuth,userOrders)



export default orderRouter