const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    first_name: {
        type:String,
        required: true
    },
    last_name: {
        type:String, 
        required: true
    },
    email: {
        type:String, 
        required: true,
        unique: true
    },
    gender: {
        type:String, 
        required: true
    },
    dob: {
        type:String, 
        required: true
    },
    national_ID: {
        type:String, 
        required: true
    },
    profile_Pic: {
        type:String, 
        required: true
    },
    address:{
        type: String,
        required:true
    },
    rating: {
        type:String, 
        required: true
    },
    vehicle: {
        type:String, 
        required: true
    }
},{
    timestamps:true
});

module.exports = mongoose.model('Driver', bookingSchema);