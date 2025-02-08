import express from "express";

import  {
    updateUser,
    getUser,
    loginUser,
    logoutUser,
    registerUser,
    userLoginStatus,
    verifyUser,
    verifyEmail,
     forgotPassword,
    resetPassword,
    changePassword}  from "../controllers/auth/userController.js";
import{
    protect,
    adminMiddleWare,
    creatorMiddleWare
} from "../middleware/authMiddleware.js";
import { deleteUser,getAllUsers } from "../controllers/auth/adminController.js";
const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",logoutUser);
router.get("/profile",protect, getUser);
router.patch("/update",protect,updateUser);

// admin route
router.delete("/admin/users/:id",protect,adminMiddleWare,deleteUser);

// get all users
router.get("/admin/users",protect,creatorMiddleWare,getAllUsers);

// Log in status
router.get("/login-status",userLoginStatus);

// email verification
router.post("/verify-email",protect,verifyEmail);

// verify user ---> email verification
router.post("/verify-user/:verificationToken", verifyUser);

// forgot password
router.post("/forgot-password",forgotPassword);

//reset password
router.post("/reset-password/:resetPasswordToken",resetPassword);

// change password ---> user must be logged in
router.patch("/change-password", protect, changePassword);

export default router;

