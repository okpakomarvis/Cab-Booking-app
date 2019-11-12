const jwt = require('jsonwebtoken');
const { errorName, formatError } = require('../../middleware/errorMiddleware');
const bycrypt = require('bcryptjs');
const Users = require('../../models/user');

export const createUser =  async (arg) => {
    try {
        const existingUsers = await Users.findOne({ email: arg.InputUser.email });
        if (existingUsers){
            throw new Error(errorName.USERALREADY);
        }
        const hashPassword = await bycrypt.hash(arg.InputUser.password, 12);
        const user = new Users({
            email: arg.InputUser.email,
            password: hashPassword
        });
        const result = await user.save();
        return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
        throw new Error(errorName.UNAVAILABLE);
    }
};

export const login = async ({ email, password}) =>{
    const user = await Users.findOne({email: email});
    if(!user){
        throw new Error(errorName.INVALID_EMAIL);
    }
    const isEqual = await bycrypt.compare(password, user.password);
    if(!isEqual){
        throw new Error(errorName.INVALID_PASSWORD);
    }
   const token = jwt.sign({ userId:user.id, email: user.email}, process.env.JWT,{ 
        algorithm: 'HS256',
       expiresIn:"1h"
    });
    if(!token){
        throw new Error(errorName.UNABLETOLOG)
    }
    return{
        userId: user.id,
        token: token,
        tokenExpiration: 1
    }
};