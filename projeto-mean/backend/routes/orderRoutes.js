const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Rota para criar um pedido
router.post('/orders', orderController.createOrder);

// Rota para obter todos os pedidos
router.get('/orders', orderController.getOrders);

// Rota para atualizar pedido
router.put('/orders/:id', orderController.updateOrder);

// Rota para deletar um pedido pelo ID
router.delete('/orders/:id', orderController.deleteOrder);

module.exports = router;
