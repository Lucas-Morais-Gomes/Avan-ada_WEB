const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rota para criar um produto
router.post('/products', productController.createProduct);

// Rota para obter todos os produtos
router.get('/products', productController.getProducts);

// Rota para obter um produto pelo ID
router.get('/products/:productId', productController.getProductById);

// Rota para obter fornecedores de um produto pelo ID do produto
router.get('/products/:productId/suppliers', productController.getSuppliersByProduct);

// Rota para atualizar produto
router.put('/products/:id', productController.updateProduct);

// Rota para deletar um produto pelo ID
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
