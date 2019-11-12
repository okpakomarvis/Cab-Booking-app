const Booking = require("../../models/booking");
const Users = require("../../models/user");
const bycrypt = require("bcryptjs");


const bookings = async (bookingsId) =>{
    try {
        const bookings = await Booking.find({_id: {$in: bookingsId}});
        bookings.map(booking =>{
           return {
                ...booking._doc, 
                _id: booking.id,
                datecreated: new Date(booking._doc.datecreated).toISOString() ,
                creator: user.bind(this, booking._doc.creator)
            }
        });
        return bookings;
    }catch(err){
        console.log(err)
        throw err;
    };
};

const user = async (userId) =>{
    try{
        const users = await Users.findById(userId);
        console.log('hello',users);
        return { 
            ...users._doc,
             _id: users.id, 
             createdBookings: bookings.bind(users._doc.createdBookings)
            };
    } catch(err){
        throw err
    }
};
module.exports = {
    bookings: async ()=>{
        try{
            const bookings = await Booking.find();
            bookings.map(booking=>{
                return {
                    ...booking._doc, 
                    _id:booking.id,
                    datecreated: new Date(booking._doc.datecreated).toISOString(),
                    creator: user.bind(booking._doc.creator)    
                };
            });
         return bookings;

        } catch(err){
            console.log(err)
            throw err;
        };
        
     
    },
    createBooking : async (arg) => {
        const booking = new Booking({
            username:arg.BookingInput.username,
            phone: arg.BookingInput.phone,
            Locationa: arg.BookingInput.Locationa,
            Locationb: arg.BookingInput.Locationb,
            datecreated: new Date(arg.BookingInput.datecreated).toISOString(),
            status: arg.BookingInput.status,
            creator:'5dc2c69975576957c089d2ce'
        });
        let createdBooking;
        try{
            const result = await booking.save();
            createdBooking =  {...result._doc, _id: result.id,datecreated: new Date(result._doc.datecreated).toISOString() , creator:user.bind(result._doc.creator)};
           const creator = await Users.findById('5dc2c69975576957c089d2ce');
            if(!creator){
                throw new Error("user not found!")
            }
            creator.createdBookings.push(booking);
            await creator.save();
            return createdBooking
        } catch(err) {
            console.log(err);
            throw err;
        }
    },
    createUser: async (arg) => {
        try{
            const existingUsers = await Users.findOne({email:arg.InputUser.email});
            if(existingUsers){
                throw new Error("user already exist!")
            }
            const hashPassword = await bycrypt.hash(arg.InputUser.password, 12);
            const user = new Users({
                email:arg.InputUser.email,
                password: hashPassword
            });
            const result = await user.save();
                return {...result._doc, password:null, _id: result.id}
        } catch(err){
            throw err
        }
        
    }
};