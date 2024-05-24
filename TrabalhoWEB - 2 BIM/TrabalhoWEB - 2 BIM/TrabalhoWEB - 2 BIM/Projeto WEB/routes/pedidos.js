var express = require('express'); 
var router = express.Router();
var pedidoModel = require('../models/pedido/pedidoModel');

router.post('/', async function (req, res, next) {
    const pedido = new pedidoModel(req.body);

    try {
        await pedido.save();
        res.status(201).send({
            "status": true,
            "message": "Pedido cadastrado."
        });
    } 
    catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async(req,res)=>{
   
    try{
        const pedidos = await pedidoModel.find().populate("produto","name");
        res.send(pedidos);
    }
    catch(error)
    {
        res.status(400).send(error);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        const _id = req.params.id;
        const pedidos = await pedidoModel.findById({_id})

        if(!pedidos) {
            return res.status(404).send
        }

        return res.status(200).send(pedidos);
    }
    catch (error) {
        res.status(400).send(error);
    }
});

router.patch('/:id', async function (req, res, next) {
    try {
        const _id = req.params.id;
        const body = req.body;
        const updatedPedidos = await pedidoModel.findByIdAndUpdate(_id, body, {new: true});

        if(!updatedPedidos) {
            return res.status(404).send
        }

        res.status(201).send({
            "status": true,
            "message": "Pedido atualizado."
        });
    }
    catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        const _id = req.params.id;
        const deletedPedidos = await pedidoModel.findByIdAndDelete(_id);

        if(!deletedPedidos) {
            return res.status(404).send
        }

        res.status(201).send({
            "status": true,
            "message": "Pedido deletado."
        });
    }
    catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;