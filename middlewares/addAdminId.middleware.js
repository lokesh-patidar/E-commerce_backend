require('dotenv').config();

const addAdminId = (req, res, next) => {
    if (req.method === "POST" && req.url === "/adminSignUp") {
        req.body.adminID = process.env.admin_id;
        console.log(req.body.adminID);
        next();
    }
    else{
        next();
    }
};

module.exports = {
    addAdminId
}