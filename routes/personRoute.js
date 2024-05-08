const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

router.post('/', async (req,res)=> {

    try {
        const data = req.body;

        const newPerson = new Person(data);

        // save the newPerson to the database
        const response = await newPerson.save();
        console.log("data saved");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server code"})
    }
})

// get the all person details
router.get('/',async (req,res)=> {
    try {
        const data = await Person.find();
        console.log("data fetched");
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server code"})
    }
})

// parameterized api calls
router.get('/:workType',async (req,res)=> {
    try {
        const response = req.params.workType;
        if(response == "chef" || response == "waiter" || response == "manager"){
            const data = await Person.find({work: response});
            console.log("data fetched");
            res.status(200).json(data);
        }else{
            res.status(400).json(response);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"})
    }
})

// update operation
router.put('/:id',async (req,res)=> {
    try {
        const personId = req.params.id;
        const updatePersonData = req.data;

        const response = await Person.findByIdAndUpdate(personId,updatePersonData,{
            new: true,
            runValidators: true,
        })

        if(!response){
            return res.status(400).json({error: "Person not found"});
        }

        console.log("data updated");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"})
    }
})

// delete the record
router.delete('/:id',async (req,res)=> {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        console.log("data deleted");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"})
    }
})

module.exports = router;