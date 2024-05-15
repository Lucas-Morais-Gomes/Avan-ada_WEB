var express = require('express');
var router = express.Router();
var subjectModel = require('../models/subject/subjectModel');

router.post('/', async function (req, res, next) {
    const subject = new subjectModel(req.body);

    try {
        await subject.save();
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
        const subjects = await subjectModel.find({});
        res.send(subjects);
    }
    catch(error)
    {
        res.status(400).send(error);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        const _id = req.params.id;
        const subject = await subjectModel.findById({_id})

        if(!subject) {
            return res.status(404).send
        }

        return res.status(200).send(subject);
    }
    catch (error) {
        res.status(400).send(error);
    }
});

router.patch('/:id', async function (req, res, next) {
    try {
        const _id = req.params.id;
        const body = req.body;
        const updatedSubjects = await subjectModel.findByIdAndUpdate(_id, body, {new: true});

        if(!updatedSubjects) {
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
        const deletedSubjects = await subjectModel.findByIdAndDelete(_id);

        if(!deletedSubjects) {
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