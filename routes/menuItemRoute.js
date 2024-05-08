const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

router.post('/',async (req,res)=> {
    try {
        const data = req.body;
        const newMenuItem = new MenuItem(data);
        const response = await newMenuItem.save();
        console.log(response);
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"})
    }
})

router.get('/',async (req,res)=> {
    try {
        const data = await MenuItem.find();
        console.log("data fetched");
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"})
    }
})

// update the field
router.put('/:id',async (req,res)=> {
    try {
        const menuId = req.params.id;
        const updateMenuItemData = req.body;
        const response = await MenuItem.findByIdAndUpdate(menuId,updateMenuItemData,{
            new: true,
            runValidators: true
        })
        if(!response){
            res.status(400).json({error: "Menu Item is not found"});
        }
        console.log("data updated");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"})
    }
})

// delete the record
router.delete("/:id",async (req,res)=> {
    try {
        const menuId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuId);
        if(!response){
            res.status(400).json({error:"menu item not found"});
        }
        console.log("data deleted");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"})
    }
})

module.exports = router;