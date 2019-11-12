const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    driver_ID: {
        type:String,
        required: true,
        unique: true
    },
    latitude: {
        type:Number, 
        required: true
    },
    longitude: {
        type:Number, 
        required: true
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model('Driverlocation', bookingSchema);