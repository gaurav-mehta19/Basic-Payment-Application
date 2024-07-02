const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/payment')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        maxLength:50
    },
    firstName:{
        type: String,
        required:true,
        maxLength:50
    },
    lastName:{
        type: String,
        required:true,
        maxLength:50
    },
    password:{
        type:String,
        minlength:8,
        required:true,
    }
})

const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})

const User = mongoose.model('user',userSchema)
const Account = mongoose.model('account',accountSchema)

module.exports = {
    User,
    Account
}