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
    },
    contact: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

})

const HomeModel = model("Home", homeSchema);
module.exports = HomeModel;