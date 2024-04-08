const {Schema, model} = require("mongoose");

const bookingSchema = new Schema({
    booking: {
      type: String,
    },
     confirmationId: {
        type: String,   
     },
     payment: {
      id: {
         type: Number,    
     },
     method: {
         type: String,
         enum: ["creditCard"]
     },
     contact: {
      phoneNumber: {
         type: String,
         match: /^[+][1-9][0-9]{4,18}$/,
         minLength: 6,
         maxLength: 20,
      },
      email: {
         type: String,
         // match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$/,
         match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
         minLength: 3,
         maxLength: 90,
      },
     },
     card: {
         enum: ["MasterCard", "Visa", "American Express", "Carte Aurore", "Maestro"],
         vendorCode: {
             type: String,
             minLength: 2,
             maxLength: 2, 
             match: /^[A-Z]{2}$/,  
         },
         cardNumber: {
             type: String,
             minLength: 2,
             maxLength: 22,
             match: /^[0-9]*$/,
         },
         expiryDate: {
             type: String,
             minLength: 7,
             maxLength: 7,
             match: /^[0-9]{4}-[0-9]{2}$/,
         }
     }
     }
});

const BookingModel = model("Booking", bookingSchema);
module.exports = BookingModel;