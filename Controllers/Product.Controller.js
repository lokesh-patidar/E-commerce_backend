const { ProductModel } = require("../models/Products.model");

exports.CreateProduct = async (req, res) => {
    const newProduct = new ProductModel(req.body);
    try {
        await newProduct.save();
        res.status(200).send({ newProduct, Message: "Product added successfully!" });
    } catch (error) {
        res.status(500).json(error).send({ Message: "Product can't be added!" });
    }
};


exports.getAllProducts = async (req, res) => {
    try {
        let { keyword, price, brand, sort, orderBy, limit, page, category } = req.query;

        const query = {};

        if (keyword) {
            query.title = { $regex: keyword, $options: "i", };
        }

        if (category) {
            query.category = category;
        }

        if (brand) {
            query.brand = brand;
        }

        if (price) {
            let [min, max] = price.split(",");
            query.price = { $gte: min, $lte: max };
        }

        if (!limit) {
            limit = 20;
        }

        if (!page) {
            page = 1;
        }

        console.log("Query:", query);
        console.log("limit:", limit);

        const products = await ProductModel.find(query)
            .sort({ [sort]: orderBy === "asc" ? 1 : orderBy === "desc" ? -1 : 0 })
            .skip((page - 1) * limit).limit(limit);

        let totalProduct = await ProductModel.find(query);

        if (!products) {
            return res.status(404).send({ message: "Product not found" });
        }

        const length = totalProduct.length;
        const totalPage = Math.ceil(length / +limit);

        return res.status(200).send({ success: true, length, totalPage, products });
    }
    catch (error) {
        return res.status(404).send({ error: error.message });
    }
};


exports.deleteProduct = async (req, res, next) => {
    const id = req.params.id
    const product = await ProductModel.findById({ _id: id });
    console.log("Deleted Product", product);

    await product.remove();
    return res.status(200).send({
        sucess: true,
        message: "Product deleted sucessfully!",
    });
};

exports.getById = async (req, res, next) => {
    const id = req.params.id
    const product = await ProductModel.findById({ _id: id });
    console.log("Product by id", product);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    return res.status(200).send({
        sucess: true,
        product,
        message: "Product by id!",
    });
};

exports.updateProduct = async (req, res) => {
    const payload = req.body;
    const id = req.params.id;

    try {
        await ProductModel.findByIdAndUpdate({ _id: id }, payload);
        res.status(200).send({ Message: "product Updated!" });
    } catch (error) {
        console.log("Error:", error);
        res.status(400).send({ Message: "Product can't be updated!" });
    }
}

// Insert many
exports.CreateManyProducts = async (req, res) => {
    const payload = req.body;
    try {
        await ProductModel.insertMany(payload);
        res.status(200).send({ Message: "All products added successfully!" });
    } catch (err) {
        console.log("Error:", err);
        res.status(400).send({ Message: "All products can't be added!" });
    }
};

// // All product delete
// exports.ClearAllProducts = async (req, res) => {
//     try {
//         await ProductModel.deleteMany({});
//         res.send({ Message: "All Products deleted!" });
//     } 
//     catch (err) {
//         console.log(err);
//         res.send({ Message: "All products can not be deleted!" });
//     }
// };
