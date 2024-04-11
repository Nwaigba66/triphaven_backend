const { Schema, model } = require("mongoose");

const homeSchema = new Schema ({
    guest: { 
        type: String
    },
    name: { 
        type: String
    },
    city: { 
        type: String
    },
    state: { 
        type: String
    },
    country: { 
        type: String
    },
    imageUrl: { 
        type: String
    },
    availableUnits: { 
        type: Number
    },
    wifi: { 
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
    },
    laundry: {
        type: String
    },

    rating: {
        type: String
    },
    contact: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

})

const HomeModel = model("Home", homeSchema);
module.exports = HomeModel;