const express = require("express");
const { addAdminId } = require("../middlewares/addAdminId.middleware");
const { AuthValidator } = require("../middlewares/Auth.middleware");
const { AdminValidation } = require("../middlewares/AdminValidation");
const { login, userProfile, getAllUsers, updateUser, removeUser, userSignUp, adminSignUp } = require("../Controllers/User.Controller");
require('dotenv').config();

const userRouter = express.Router();
userRouter.use(addAdminId);

userRouter.post("/usersignup", userSignUp);
userRouter.post("/adminsignup", adminSignUp);
userRouter.post("/login", login);

// validation for users to get their profile only
userRouter.use(AuthValidator);

userRouter.get("/id", userProfile);
userRouter.patch("/:id", updateUser);

// After this validation only admin can perform actions
userRouter.use(AdminValidation);

userRouter.get("/", getAllUsers);
userRouter.delete("/:id", removeUser);

module.exports = { userRouter };