const express = require("express");
const { AuthValidator } = require("../middlewares/Auth.middleware");
const { OrderValidation } = require("../middlewares/OrderedValidated.middleware");
const { AdminValidation } = require("../middlewares/AdminValidation");
const { OrdereModel } = require("../models/Ordered.model");
const orderRouter = express.Router();

orderRouter.use(AuthValidator);

orderRouter.get("/", async (req, res) => {
    try {
        let orderddata = await OrdereModel.find();
        res.send(orderddata);
    }
    catch (err) {
        console.log(err);
        res.send({ Message: "Can not find products!" });
    }
});


// Insert many
orderRouter.use(OrderValidation);

orderRouter.post("/addOrderItem", async (req, res) => {
    const payload = req.body;
    try {
        const orderItem = new OrdereModel(payload);
        await orderItem.save();
        res.send({ Message: "Order Placed Successfully!" });
    }
    catch (err) {
        console.log(err);
        res.send({ Message: "Can not place ordere!" });
    }
});

orderRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await OrdereModel.findByIdAndDelete({ "_id": id });
        res.send({ Message: "Ordered Item Deleted!" });
    } catch (error) {
        console.log(err);
        res.send({ Message: "Can not delete ordered item!" });
    }
});

// only admin can add many cart items
orderRouter.use(AdminValidation);

// Delete all cart items

orderRouter.delete("/deletemany", async (req, res) => {
    try {
        await OrdereModel.deleteMany();
        res.send({ Message: "All ordered Items deleted!" });
    }
    catch (err) {
        console.log(err);
        res.send({ Message: "Can not delete all ordered items something went wrong!" });
    }
});


module.exports = { orderRouter };