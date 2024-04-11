const {Schema, model} = require("mongoose");

const bookingSchema = new Schema({
    booking: {
      type: String,
    },
    checkIn: {
        type: Date,
        default: Date.now
      },
      checkOut: {
        type: Date,
      },
     confirmationId: {
        type: String,   
     },
     contact: {
        type: Schema.Types.ObjectId,
        ref: "User"
        },
     payment: {
      id: {
         type: Number,    
     },
     method: {
         type: String,
         enum: ["creditCard"]
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