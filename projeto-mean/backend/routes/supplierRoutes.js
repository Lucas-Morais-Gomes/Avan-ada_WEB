const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

// Rota para criar um fornecedor
router.post('/suppliers', supplierController.createSupplier);

// Rota para obter todos os fornecedores
router.get('/suppliers', supplierController.getSuppliers);

// Rota para obter o produto de um fornecedor pelo ID do fornecedor
router.get('/suppliers/:id/products', supplierController.getSuppliersByProduct);

module.exports = router;
