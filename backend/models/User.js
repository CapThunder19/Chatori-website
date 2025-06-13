const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, 'Please enter your name'],
        trim:true
    },
    email:{
        type:String,
        required:[true, 'Please enter your email'],
        unique:true,
        lowercase:true,
        trim:true

    },
    password:{
        type:String,
        required:[true,'Please enter password'],
        minlength:[6, 'Password must be atleast 6 characters']

    }
},
{timestamps:true});

userSchema.pre('save', async function(next){
if(!this.isModified('password')){
   return next();
}

try{
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
}
catch(err){
    next(err);
}
});


userSchema.methods.matchPassword = async function(enteredpassword){
    return await bcrypt.compare(enteredpassword,this.password);
}

module.exports = mongoose.model('User', userSchema)

