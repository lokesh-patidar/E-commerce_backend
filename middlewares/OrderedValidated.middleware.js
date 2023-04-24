const jwt = require("jsonwebtoken");
require('dotenv').config();

const OrderValidation = (req, res, next) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.key);

    if(req.method === "POST" && decoded) {
        req.body.orderID = decoded.userID;  
        console.log("orderid",req.body.orderID);
        next();
    } 
    else {
        console.log("else");
        next();
    }
};

module.exports = { OrderValidation };