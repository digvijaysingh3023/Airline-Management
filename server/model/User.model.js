const mongoose = require('mongoose')
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    username : {
        type:String,
        required: [true,"Please provide unique username"],
        unique:[true,"Username Already Exists"]
    },
    password:{
        type:String,
        required:[true,"Please provide a password"],
        unique:false,
    },
    email:{
        type:String,
        required:[true,"Please provide a email"],
        unique:true,
        validate: [validator.isEmail, 'Invalid email'],
    },
    firstName:{type:String},
    lastName:{type:String},
    mobile:{type:Number},
    address:{type:String},
    profile:{type:String}
})
 

module.exports = mongoose.model.Users || mongoose.model('User' ,UserSchema)