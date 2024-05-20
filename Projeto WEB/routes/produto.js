var express = require('express');
var router = express.Router();
var produtoModel = require('../models/produto/produtoModel');

router.post('/', async function (req, res, next) {
    const produto = new produtoModel(req.body);

    try {
        await produto.save();
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
        const produtos = await produtoModel.find({});
        res.send(produtos);
    }
    catch(error)
    {
        res.status(400).send(error);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        const _id = req.params.id;
        const produto = await produtoModel.findById({_id})

        if(!produto) {
            return res.status(404).send
        }

        return res.status(200).send(produto);
    }
    catch (error) {
        res.status(400).send(error);
    }
});

router.patch('/:id', async function (req, res, next) {
    try {
        const _id = req.params.id;
        const body = req.body;
        const updatedProdutos = await produtoModel.findByIdAndUpdate(_id, body, {new: true});

        if(!updatedProdutos) {
            return res.status(404).send
        }

        res.status(201).send({
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
        const deletedProdutos = await produtoModel.findByIdAndDelete(_id);

        if(!deletedProdutos) {
            return res.status(404).send
        }

        res.status(201).send({
            "status": true,
            "message": "Produto deletado."
        });
    }
    catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;