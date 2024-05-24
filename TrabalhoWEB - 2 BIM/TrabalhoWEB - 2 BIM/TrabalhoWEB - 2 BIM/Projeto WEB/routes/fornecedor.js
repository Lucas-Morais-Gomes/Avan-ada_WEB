var express = require('express');
var router = express.Router();
var fornecedorModel = require('../models/fornecedor/fornecedorModel');

router.post('/', async function (req, res, next) {
    const fornecedor = new fornecedorModel(req.body);

    try {
        await fornecedor.save();
        res.status(201).send({
            "status": true,
            "message": "Fornecedor criado."
        });
    } 
    catch (error) {
        console.log(error.message);
        res.status(400).send(error);
    }
});

router.get('/', async(req,res)=>{
   
    try{
        const fornecedores = await fornecedorModel.find({});
        res.send(fornecedores);
    }
    catch(error)
    {
        res.status(400).send(error);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        const _id = req.params.id;
        const fornecedor = await fornecedorModel.findById({_id})

        if(!fornecedor) {
            return res.status(404).send
        }

        return res.status(200).send(fornecedor);
    }
    catch (error) {
        res.status(400).send(error);
    }
});

router.patch('/:id', async function (req, res, next) {
    try {
        const _id = req.params.id;
        const body = req.body;
        const updatedFornecedors = await fornecedorModel.findByIdAndUpdate(_id, body, {new: true});

        if(!updatedFornecedors) {
            return res.status(404).send
        }

        res.status(201).send({
            "status": true,
            "message": "Fornecedor atualizado."
        });
    }
    catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        const _id = req.params.id;
        const deletedFornecedors = await fornecedorModel.findByIdAndDelete(_id);

        if(!deletedFornecedors) {
            return res.status(404).send
        }

        res.status(201).send({
            "status": true,
            "message": "Fornecedor deletado."
        });
    }
    catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;