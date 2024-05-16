var express = require('express');
var router = express.Router();
var mentorModel = require('../models/mentor/mentorModel');

router.post('/', async function (req, res, next) {
    const mentor = new mentorModel(req.body);

    try {
        await mentor.save();
        res.status(201).send({
            "status": true,
            "message": "Mentor criado."
        });
    } 
    catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async(req,res)=>{
   
    try{
        const mentors = await mentorModel.find().populate('product', 'name'); // Alteração aqui: Mudar para 'product' em vez de 'subject'
        res.send(mentors);
    }
    catch(error)
    {
        res.status(400).send(error);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        const _id = req.params.id;
        const mentor = await mentorModel.findById({_id})

        if(!mentor) {
            return res.status(404).send
        }

        return res.status(200).send(mentor);
    }
    catch (error) {
        res.status(400).send(error);
    }
});

router.patch('/:id', async function (req, res, next) {
    try {
        const _id = req.params.id;
        const body = req.body;
        const updatedMentors = await mentorModel.findByIdAndUpdate(_id, body, {new: true});

        if(!updatedMentors) {
            return res.status(404).send
        }

        res.status(201).send({
            "status": true,
            "message": "Mentor atualizado."
        });
    }
    catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        const _id = req.params.id;
        const deletedMentors = await mentorModel.findByIdAndDelete(_id);

        if(!deletedMentors) {
            return res.status(404).send
        }

        res.status(201).send({
            "status": true,
            "message": "Mentor deletado."
        });
    }
    catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
