//as we are creating schema, we will ignore mongoose

// const mongoose = require('mongoose');

//actually we dont need the whole package mongoose
//we just need schema and model
const {Schema, model} = require('mongoose');
const uuidd = require('uuid');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        id: {type: String, unique: true}, //to generate random user ids we can install a package "uuid" - npm install uuid
        fullName: {type: String, default:""},
        email:{type:String, unique:true, required:true},
        password:{type: String, required:true},
        phoneNumber:{type:String,default:""},
        address:{type: String, default:""},
        city:{type:String,default:""},
        profileProgress:{type:Number,default:0},
        updatedOn:{type: Date},
        createdOn:{type: Date},
    }
);
//before actually updating/exectuing above schema.. we can perform actions on it likee password hashing or changing the past date
//to current date.
//next ko call karne pe 'save' hojayega
userSchema.pre('save',function(next){
    this.id = uuidd.v1();
    this.updatedOn = new Date();
    this.createdOn = new Date();
    //to hash the password.. install package 'bcrypt'

    //hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    next();
    //next() ko agar eek string params dedenge iska matlab ye hoga ki error ko hm pass krre h kuch. that we r throwing eexception
});

userSchema.pre(['update','findOneAndUpdate','updateOne'],function(next){
    //kuch imp fields hoti h model me jinko na he chedhe toh acha h, jaise ki _id, id.. toh asie cases me hm uss delete krsakte h iss
    //iss particular funcn ke scope se ki wo use he na hopaye

    const update = this.getUpdate();
    delete update._id;
    delete update.id;

    this.updatedOn = new Date();
    next();
});

//creating a model for the schema and making it available for the whole project.
const UserModel = model('User',userSchema);
module.exports = UserModel;
//--->next:
// model ke bad ab iss model ka controler banaynge