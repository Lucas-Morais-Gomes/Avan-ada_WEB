const Order = require('../models/Order');
const Supplier = require('../models/Supplier');
const Product = require('../models/Product')

// Função para criar um novo pedido
exports.createOrder = async (req, res) => {
    console.log('Requisição para criar um novo pedido recebida');
    try {
        const { name, email, cpf, product, supplier } = req.body;
        console.log(req.body)
        // Validações simples
        if (!name || !email || !cpf || !product || !supplier) {
            console.log('Dados inválidos: todos os campos são obrigatórios');
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        // Verificar se o fornecedor e o produto existem
        const existingProduct = await Product.findById(product);
        const existingSupplier = await Supplier.findById(supplier);

        if (!existingProduct || !existingSupplier) {
            console.log('Produto ou fornecedor não encontrado');
            return res.status(404).json({ message: 'Produto ou fornecedor não encontrado' });
        }

        const newOrder = new Order({ name, email, cpf, product, supplier });
        const savedOrder = await newOrder.save();
        console.log('Pedido criado com sucesso:', savedOrder);
        res.status(201).json(savedOrder);
    } catch (err) {
        console.error('Erro ao criar pedido:', err.message);
        res.status(500).json({ message: err.message });
    }
};

// Função para obter todos os pedidos
exports.getOrders = async (req, res) => {
    console.log('Requisição para obter todos os pedidos recebida');
    try {
        const orders = await Order.find().populate('supplier product');
        console.log('Pedidos obtidos com sucesso:', orders);
        res.status(200).json(orders);
    } catch (err) {
        console.error('Erro ao obter pedidos:', err.message);
        res.status(500).json({ message: err.message });
    }
};

// Função para atualizar um pedido
exports.updateOrder = async (req, res) => {
    console.log('Requisição para atualizar um pedido recebida');
    try {
        const { id } = req.params;
        const { name, email, cpf, product, supplier } = req.body;
        console.log(req.body);

        if (!name || !email || !cpf || !product || !supplier) {
            console.log('Dados inválidos: todos os campos são obrigatórios');
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        const existingProduct = await Product.findById(product);
        const existingSupplier = await Supplier.findById(supplier);

        if (!existingProduct || !existingSupplier) {
            console.log('Produto ou fornecedor não encontrado');
            return res.status(404).json({ message: 'Produto ou fornecedor não encontrado' });
        }

        const updatedOrder = await Order.findByIdAndUpdate(id, { name, email, cpf, product, supplier }, { new: true });
        if (!updatedOrder) {
            console.log('Pedido não encontrado');
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }

        console.log('Pedido atualizado com sucesso:', updatedOrder);
        res.status(200).json(updatedOrder);
    } catch (err) {
        console.error('Erro ao atualizar pedido:', err.message);
        res.status(500).json({ message: err.message });
    }
};

// Função para deletar um pedido
exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        // Verifica se o pedido existe
        const order = await Order.findById(id);
        if (!order) {
            console.log('Pedido não encontrado');
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }

        // Deleta o pedido
        await Order.findByIdAndDelete(id);
        console.log('Pedido deletado com sucesso');
        res.status(200).json({ message: 'Pedido deletado com sucesso' });
    } catch (err) {
        console.error('Erro ao deletar pedido:', err.message);
        res.status(500).json({ message: err.message });
    }
};
