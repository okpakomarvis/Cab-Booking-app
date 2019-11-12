const Booking = require('../../models/booking');
const { errorName, formatError } = require('../../middleware/errorMiddleware');
const Users = require('../../models/user');

export const bookings = async (arg, req) => {
    if(!req.user){
        throw new Error(errorName.UNAUTHORIZE);
    }
    try {
        const bookings = await Booking.find().populate({path: "creator",
            populate: {
                path: "createdBookings",
                populate: {
                    path: "creator"
                }
            }
        });
        bookings.map((booking) => {
            return {
                ...booking._doc,
                _id: booking.id,
                datecreated: new Date(booking._doc.datecreated).toISOString()
            };
        });

    return bookings;
    
    } catch (err) {
        throw new Error(errorName.UNAVAILABLE);
    }
}

export const pastBooking =async (arg, req) => {
    if(!req.user){
        throw new Error(errorName.UNAUTHORIZE);
    }
    try {
        const bookings = await Booking.find({ creator: { $in: req.user } }).populate('creator');
        bookings.map((booking) => {
            return {
                ...booking._doc,
                _id: booking.id,
                datecreated: new Date(booking._doc.datecreated).toISOString()
            };
        });
        return bookings;
    } catch (err) {
        throw new Error(errorName.UNAVAILABLE);
    }
};

export const createBooking = async (arg, req) => {
		
    const booking = new Booking({
        username: arg.BookingInput.username,
        phone: arg.BookingInput.phone,
        Locationa: arg.BookingInput.Locationa,
        Locationb: arg.BookingInput.Locationb,
        datecreated: new Date(arg.BookingInput.datecreated).toISOString(),
        status: arg.BookingInput.status,
        creator: req.user
    });
    let createdBooking;
    try {
        const result = await booking.save();
        createdBooking = {
            ...result._doc,
            _id: result.id,
            datecreated: new Date(result._doc.datecreated).toISOString()
        };
        const creator = await Users.findById(req.user);
        if (!creator) {
            throw new Error(errorName.USERNOTFOUND);
            
        }
        creator.createdBookings.push(booking);
        await creator.save();
        return createdBooking;
    } catch (err) {
        console.log(err);
        throw new Error(errorName.UNAVAILABLE);
    }
};