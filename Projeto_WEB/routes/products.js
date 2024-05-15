var express = require('express');
var router = express.Router();
var productsModel = require('../models/products/productsModel');

router.post('/', async function (req, res, next) {
    const products = new productsModel(req.body);

    try {
        await products.save();
        res.status(201).send({
            "status": true,
            "message": "Matéria criada."
        });
    } 
    catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async(req,res)=>{
   
    try{
        const products = await productsModel.find({});
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
        const products = await productsModel.findById({_id})

        if(!products) {
            return res.status(404).send
        }

        return res.status(200).send(products);
    }
    catch (error) {
        res.status(400).send(error);
    }
});

router.patch('/:id', async function (req, res, next) {
    try {
        const _id = req.params.id;
        const body = req.body;
        const updatedproductss = await productsModel.findByIdAndUpdate(_id, body, {new: true});

        if(!updatedproductss) {
            return res.status(404).send
        }

        res.status(201).send({
            "status": true,
            "message": "Matéria atualizada."
        });
    }
    catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        const _id = req.params.id;
        const deletedproductss = await productsModel.findByIdAndDelete(_id);

        if(!deletedproductss) {
            return res.status(404).send
        }

        res.status(201).send({
            "status": true,
            "message": "Matéria deletado."
        });
    }
    catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;