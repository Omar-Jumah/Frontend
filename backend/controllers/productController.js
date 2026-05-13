import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, image, imageUrl } = req.body;

    const product = await Product.create({
      name,
      description: description || "No description provided.",
      price: Number(price),
      category: category || "General",
      imageUrl:
        imageUrl ||
        image ||
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700",
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log("Create Product Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};