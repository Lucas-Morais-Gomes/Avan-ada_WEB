const Supplier = require('../models/Supplier');
const Product = require('../models/Product');
const Order = require("../models/Order")
const mongoose = require('mongoose');

// Função para criar um novo fornecedor
exports.createSupplier = async (req, res) => {
    console.log('Requisição para criar um novo fornecedor recebida');
    try {
        const { name, email, cnpj, phone, product } = req.body;
        console.log(req.body)
        if (!name || !email || !cnpj || !phone || !product) {
            console.log('Dados inválidos: todos os campos são obrigatórios');
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        const existingProduct = await Product.findById(product);
        if (!existingProduct) {
            console.log('Produto não encontrado:', product);
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        const newSupplier = new Supplier({ name, email, cnpj, phone, product: product });
        const savedSupplier = await newSupplier.save();

        existingProduct.suppliers.push(savedSupplier._id); // Adiciona o ID do fornecedor ao array de fornecedores do produto
        await existingProduct.save();

        console.log('Fornecedor criado com sucesso:', savedSupplier);
        res.status(201).json(savedSupplier);
    } catch (err) {
        console.error('Erro ao criar fornecedor:', err.message);
        res.status(500).json({ message: err.message });
    }
};



exports.getSuppliers = async (req, res) => {
    console.log('Requisição para obter todos os fornecedores recebida');
    try {
        const suppliers = await Supplier.find().populate('product');
        console.log('Fornecedores obtidos com sucesso:', suppliers);
        res.status(200).json(suppliers);
    } catch (err) {
        console.error('Erro ao obter fornecedores:', err.message);
        res.status(500).json({ message: err.message });
    }
};


// Função para obter fornecedores pelo produto
exports.getSuppliersByProduct = async (req, res) => {
    console.log('Requisição para obter fornecedores pelo produto recebida');
    try {
        const { productId } = req.params;

        // Encontre fornecedores que fornecem o produto com base no ID do produto
        const suppliers = await Supplier.find({ product: productId });

        console.log('Fornecedores para o produto obtidos com sucesso:', suppliers);
        res.status(200).json(suppliers);
    } catch (err) {
        console.error('Erro ao obter fornecedores pelo produto:', err.message);
        res.status(500).json({ message: err.message });
    }
};

// Função para atualizar um fornecedor
exports.updateSupplier = async (req, res) => {
    console.log('Requisição para atualizar um fornecedor recebida');
    try {
        const { id } = req.params;
        const { name, email, cnpj, phone, product } = req.body;
        console.log(req.body);

        if (!name || !email || !cnpj || !phone || !product) {
            console.log('Dados inválidos: todos os campos são obrigatórios');
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        const existingProduct = await Product.findById(product);
        if (!existingProduct) {
            console.log('Produto não encontrado');
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        const updatedSupplier = await Supplier.findByIdAndUpdate(id, { name, email, cnpj, phone, product }, { new: true });
        if (!updatedSupplier) {
            console.log('Fornecedor não encontrado');
            return res.status(404).json({ message: 'Fornecedor não encontrado' });
        }

        console.log('Fornecedor atualizado com sucesso:', updatedSupplier);
        res.status(200).json(updatedSupplier);
    } catch (err) {
        console.error('Erro ao atualizar fornecedor:', err.message);
        res.status(500).json({ message: err.message });
    }
};

// Função para deletar um fornecedor e seus pedidos associados
exports.deleteSupplier = async (req, res) => {
    console.log('Requisição para excluir um Fornecedor recebida');
    try {
        const { id } = req.params;

        // Remove pedidos associados
        await Order.deleteMany({ supplier: id });
        
        // Encontre e remova o fornecedor
        const supplier = await Supplier.findByIdAndDelete(id);
        if (!supplier) {
            console.log('Fornecedor não encontrado');
            return res.status(404).json({ message: 'Fornecedor não encontrado' });
        }        

        console.log('Fornecedor e relacionados deletados com sucesso');
        res.status(200).json({ message: 'Fornecedor e relacionados deletados com sucesso' });
    } catch (err) {
        console.error('Erro ao excluir Fornecedor:', err.message);
        res.status(500).json({ message: err.message });
    }
};