const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

// Rota para criar um fornecedor
router.post('/suppliers', supplierController.createSupplier);

// Rota para obter todos os fornecedores
router.get('/suppliers', supplierController.getSuppliers);

// Rota para obter o produto de um fornecedor pelo ID do fornecedor
router.get('/suppliers/:id/products', supplierController.getSuppliersByProduct);

// Rota para atualizar fornecedor
router.put('/suppliers/:id', supplierController.updateSupplier);

// Rota para deletar um fornecedor pelo ID
router.delete('/suppliers/:id', supplierController.deleteSupplier);

module.exports = router;
