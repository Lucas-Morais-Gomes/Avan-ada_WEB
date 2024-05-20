const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Rota para criar um pedido
router.post('/orders', orderController.createOrder);

// Rota para obter todos os pedidos
router.get('/orders', orderController.getOrders);

module.exports = router;
