var express = require('express');
var router = express.Router();
// Alteração aqui: Importar o modelo de dados de produtos
var productModel = require('../models/product/productModel');

router.post('/', async function (req, res, next) {
    const product = new productModel(req.body);

    try {
        await product.save();
        res.status(201).send({
            "status": true,
            "message": "Produto criado."
        });
    } 
    catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async(req,res)=>{
   
    try{
        const products = await productModel.find({});
        res.send(products);
    }
    catch(error)
    {
        res.status(400).send(error);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        const _id = req.params.id;
        const product = await productModel.findById(_id);

        if(!product) {
            return res.status(404).send({
                "status": false,
                "message": "Produto não encontrado."
            });
        }

        return res.status(200).send(product);
    }
    catch (error) {
        res.status(400).send(error);
    }
});

router.patch('/:id', async function (req, res, next) {
    try {
        const _id = req.params.id;
        const body = req.body;
        const updatedProduct = await productModel.findByIdAndUpdate(_id, body, {new: true});

        if(!updatedProduct) {
            return res.status(404).send({
                "status": false,
                "message": "Produto não encontrado."
            });
        }

        res.status(200).send({
            "status": true,
            "message": "Produto atualizado."
        });
    }
    catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        const _id = req.params.id;
        const deletedProduct = await productModel.findByIdAndDelete(_id);

        if(!deletedProduct) {
            return res.status(404).send({
                "status": false,
                "message": "Produto não encontrado."
            });
        }

        res.status(200).send({
            "status": true,
            "message": "Produto deletado."
        });
    }
    catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
