const express = require("express");
const { AuthValidator } = require("../middlewares/Auth.middleware");
const {AdminValidation } = require("../middlewares/AdminValidation");
const { getAllProducts, CreateProduct, deleteProduct, getById, CreateManyProducts, ClearAllProducts } = require("../Controllers/Product.Controller");
const { ProductModel } = require("../models/Products.model");
const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.post("/", CreateProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.get("/:id", getById);

// validate users can do these operations only
productRouter.use(AuthValidator);
// Validation these operation could only be done by admin only
productRouter.use(AdminValidation);

productRouter.post("/addmany", CreateManyProducts);
// productRouter.delete("/clearall", ClearAllProducts);



// // Quantity range
// productRouter.get("/quantity", async (req, res) => {
//   const q_low = req.query.q_low;
//   const q_high = req.query.q_high;
//   if (q_low && q_high) {
//     try {
//       let products = await ProductModel.find({
//         $and: [{ quantity: { $gt: q_low } }, { quantity: { $lt: q_high } }],
//       });
//       res.send(products);
//     } 
//     catch (err) {
//       console.log(err);
//       res.send({ message: "Can't find products in given quantities range!" });
//     }
//   } else {
//     res.send({ message: "Something went wrong!" });
//   }
// });

// // get by ID
// productRouter.get("/getById/:id", async (req, res) => {
//   let id = req.params.id;
//   try {
//     const productItem = await ProductModel.findById({ _id: id });
//     res.send(productItem);
//   } 
//   catch (err) {
//     console.log(err);
//     res.send({ Message: "Can't find product item by given id!" });
//   }
// });

// productRouter.patch("/update/:id", async (req, res) => {
  // const payload = req.body;
  // const id = req.params.id;

  // try {
  //   await ProductModel.findByIdAndUpdate({ _id: id }, payload);
  //   res.send({ Message: "product Updated!" });
  // } catch (error) {
  //   console.log(err);
  //   res.send({ Message: "Product can't be updated!" });
  // }
// });





// 
// productRouter.post("/addmany", async (req, res) => {
// const payload = req.body;
// try {
//   await ProductModel.insertMany(payload);
//   res.send({ Message: "All products added successfully!" });
//   console.log(product);
// } catch (err) {
//   console.log(err);
//   res.send({ Message: "All products can't be added!" });
// }
// });

// 
productRouter.delete("/deletemany", async (req, res) => {
  try {
    await ProductModel.deleteMany();
    res.send({ Message: "All Products deleted!" });
  } catch (err) {
    console.log(err);
    res.send({ Message: "All products can not be deleted!" });
  }
});

// productRouter.post("/add", async (req, res) => {
//   const payload = req.body;
//   try {
//     const product = new ProductModel(payload);
//     await product.save();
//     res.send({ Message: "Product added successfully!" });
//     console.log(product);
//   } catch (err) {
//     console.log(err);
//     res.send({ Message: "Product can not be added!" });
//   }
// });

// productRouter.delete("/delete/:id", async (req, res) => {
//   const id = req.params.id;

//   try {
//     await ProductModel.findByIdAndDelete({ _id: id });
//     res.send("Product Deleted Successfully!");
//   } catch (error) {
//     console.log(err);
//     res.send({ msg: "Product can't be deleted!" });
//   }
// });

module.exports = { productRouter };
