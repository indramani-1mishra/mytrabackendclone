const { createproductse, updateproducts, findproduct, removeproducts } = require("../service/productservice");

const productcontrollerc = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Image is required",
                success: false,
                data: {},
            });
        }

        const response = await createproductse({
            productname: req.body.productname,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            instock: req.body.instock,
            quantity: req.body.quantity,
            rating: req.body.rating,
            image: req.file.path,
        });

        if (!response) {
            return res.status(500).json({
                message: "Could not create product",
                success: false,
                data: {},
            });
        }

        return res.status(201).json({
            message: "Data created successfully",
            success: true,
            data: response,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Could not create product",
            success: false,
            error: error.message,
            data: {},
        });
    }
};

const productUpdatecontroller = async (req, res) => {
    try {
        const response = await updateproducts(req.params.id, {
            productname: req.body.productname,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            instock: req.body.instock,
            quantity: req.body.quantity,
            rating: req.body.rating,
            image: req.file ? req.file.path : undefined, // Optional image update
        });

        if (!response) {
            return res.status(404).json({
                message: "Could not find object to update",
                success: false,
                data: {},
            });
        }

        return res.status(200).json({
            message: "Data updated successfully",
            success: true,
            data: response,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Could not update product",
            success: false,
            error: error.message,
            data: {},
        });
    }
};

const getAllProductsController = async (req, res) => {
    try {
        const response = await findproduct();

        if (!response || response.length === 0) {
            return res.status(404).json({
                message: "No products found",
                success: false,
                data: {},
            });
        }

        return res.status(200).json({
            message: "Data fetched successfully",
            success: true,
            data: response,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Could not get all products",
            success: false,
            error: error.message,
            data: {},
        });
    }
};

const removeproductscontroller = async (req, res) => {
    try {
        const response = await removeproducts(req.params.id);
        
        if (!response) {
            return res.status(404).json({
                message: "Product not found or already deleted",
                success: false,
                data: {},
            });
        }

        return res.status(200).json({
            message: "Product successfully deleted",
            success: true,
            data: response,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Could not delete product",
            success: false,
            error: error.message,
            data: {},
        });
    }
};

const getproductsbuidcontroller = async (req, res) => {
    try {
        const response = await findproduct(req.params.id);
        
        if (!response) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
                data: {},
            });
        }

        return res.status(200).json({
            message: "Product fetched successfully",
            success: true,
            data: response,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Could not get product",
            success: false,
            error: error.message,
            data: {},
        });
    }
};

module.exports = {
    productcontrollerc,
    productUpdatecontroller,
    getproductsbuidcontroller,
    removeproductscontroller,
    getAllProductsController,
};
