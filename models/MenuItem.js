const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    "name":{
        type: String,
        required: true
    },
    "price": {
        type: Number,
        required: true
    },
    "taste": {
        type: String,
        required: true,
        enum: ['Sweet','Sour','Spicy']
    },
    "is_drink":{
        type: Boolean,
        default: false,
        required: true
    },
    "ingredients":{
        type: [String],
        required: true,
        default: []
    },
    "num_sales":{
        type: Number,
        default: 0,
    }
})

const MenuItem = mongoose.model("MenuItem",menuSchema);
module.exports = MenuItem;