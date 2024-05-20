var express = require('express'); 
var router = express.Router();
var clienteModel = require('../models/cliente/clienteModel');

router.post('/', async function (req, res, next) {
    const cliente = new clienteModel(req.body);

    try {
        await cliente.save();
        res.status(201).send({
            "status": true,
            "message": "Cliente cadastrado."
        });
    } 
    catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async(req,res)=>{
   
    try{
        const clientes = await clienteModel.find({});
        res.send(clientes);
    }
    catch(error)
    {
        res.status(400).send(error);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        const _id = req.params.id;
        const clientes = await clienteModel.findById({_id})

        if(!clientes) {
            return res.status(404).send
        }

        return res.status(200).send(clientes);
    }
    catch (error) {
        res.status(400).send(error);
    }
});

router.patch('/:id', async function (req, res, next) {
    try {
        const _id = req.params.id;
        const body = req.body;
        const updatedClientes = await clienteModel.findByIdAndUpdate(_id, body, {new: true});

        if(!updatedClientes) {
            return res.status(404).send
        }

        res.status(201).send({
            "status": true,
            "message": "Cliente atualizado."
        });
    }
    catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        const _id = req.params.id;
        const deletedClientes = await clienteModel.findByIdAndDelete(_id);

        if(!deletedClientes) {
            return res.status(404).send
        }

        res.status(201).send({
            "status": true,
            "message": "Cliente deletado."
        });
    }
    catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;