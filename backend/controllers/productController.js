const Product = require('../models/Product');

let productsDB = [
    new Product('1', 'Laptop HP', 5, 750.00),
    new Product('2', 'Mouse Inalámbrico', 15, 25.50)
];

const getProducts = async (req, res) => {
    try {
        const jsonProducts = productsDB.map(p => p.toJSON());
        res.status(200).json(jsonProducts);
    } catch (error) {
        res.status(500).json({ error: "Error interno al obtener productos" });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, quantity, price } = req.body;

        // Sanitización explícita para evitar inyección XSS
        const sanitizedName = String(name).replace(/<[^>]*>?/gm, '').trim();

        const id = Date.now().toString();
        const newProduct = new Product(id, sanitizedName, Number(quantity), Number(price));
        
        productsDB.push(newProduct);

        res.status(201).json({
            message: "Producto registrado exitosamente",
            data: newProduct.toJSON()
        });
    } catch (error) {
        res.status(400).json({ error: error.message || "Datos inválidos" });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        productsDB = productsDB.filter(p => p.id !== id);
        res.status(200).json({ message: "Producto eliminado" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar producto" });
    }
};

module.exports = { getProducts, createProduct, deleteProduct };