const jwt = require("jsonwebtoken");
require('dotenv').config();

const AddToCartValidation = (req, res, next) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.key);

    if (req.method === "POST" && decoded) {
        req.body.cartID = decoded.userID;
        next();
    } 
    else {
        next();
    }
};

module.exports = { AddToCartValidation };