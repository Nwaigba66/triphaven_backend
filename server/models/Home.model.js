const { Schema, model } = require("mongoose");

const homeSchema = new Schema ({
    id: { 
        type: String
    },
    name: { 
        type: String
    },
    imageurl: { 
        type: String
    },
    price: {
        type: String
    },
    priceCurrency: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    }

})

const HomeModel = model("Home", homeSchema);
module.exports = HomeModel;