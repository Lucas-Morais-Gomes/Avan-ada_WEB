const Supplier = require('../models/Supplier');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// Função para criar um novo produto
exports.createProduct = async (req, res) => {
    console.log('Requisição para criar um novo produto recebida');
    try {
        const { name, type } = req.body;
        
        // Validações simples
        if (!name || !type) {
            console.log('Dados inválidos: nome e tipo são obrigatórios');
            return res.status(400).json({ message: 'Nome e tipo são obrigatórios' });
        }

        const newProduct = new Product({ name, type });
        const savedProduct = await newProduct.save();
        console.log('Produto criado com sucesso:', savedProduct);
        res.status(201).json(savedProduct);
    } catch (err) {
        console.error('Erro ao criar produto:', err.message);
        res.status(500).json({ message: err.message });
    }
};

// Função para obter todos os produtos
exports.getProducts = async (req, res) => {
    console.log('Requisição para obter todos os produtos recebida');
    try {
        const products = await Product.find();
        console.log('Produtos obtidos com sucesso:', products);
        res.status(200).json(products);
    } catch (err) {
        console.error('Erro ao obter produtos:', err.message);
        res.status(500).json({ message: err.message });
    }
};

// Função para obter um produto pelo ID
exports.getProductById = async (req, res) => {
    console.log('Requisição para obter um produto pelo ID recebida');
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        if (!product) {
            console.log('Produto não encontrado:', productId);
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        console.log('Produto obtido com sucesso:', product);
        res.status(200).json(product);
    } catch (err) {
        console.error('Erro ao obter produto pelo ID:', err.message);
        res.status(500).json({ message: err.message });
    }
};

// Função para obter fornecedores de um produto pelo ID do produto
exports.getSuppliersByProduct = async (req, res) => {
    console.log('Requisição para obter fornecedores pelo produto recebida');
    try {
        const { productId } = req.params;

        // Encontre o produto pelo seu ID
        const product = await Product.findById(productId);

        if (!product) {
            console.log('Produto não encontrado');
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        // Encontre fornecedores que fornecem este produto
        const suppliers = await Supplier.find({ _id: { $in: product.suppliers } });

        console.log('Fornecedores para o produto obtidos com sucesso:', suppliers);
        res.status(200).json(suppliers);
    } catch (err) {
        console.error('Erro ao obter fornecedores pelo produto:', err.message);
        res.status(500).json({ message: err.message });
    }
};
