const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/User.route");
const { productRouter } = require("./routes/Product.route");
const { cartRouter } = require("./routes/Cart.route");
const { Validator } = require("./middlewares/Validator.middleware");
const { orderRouter } = require("./routes/Order.route");

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*"
}));

app.get("/", (req,res) => {
    res.send({Message: "Welcome to Grocery Mart Backend"});
});

app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

// Validation for all fields
app.use(Validator);
app.use("/users", userRouter);

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Connected to the Database of GroceryMart");
    }
    catch (err) {
        console.log(err);
        console.log("Connection Failed!");
    }
    console.log(`Server is running...`);
});