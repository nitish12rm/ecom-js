const UserModel = require('../models/user_model');
const bcrypt = require('bcrypt');
const UserController = {
    //res aur req ayega kaha se? ye ayega from the api as json aur redirect hoga iss funcn me using routes. jo hmne router me define
    //kia h
    
    createAccount: async function(req,res){
        try {
            const userData = req.body;
            const newUser = new UserModel(userData);
            await newUser.save();
            return res.json({success:true, data: newUser, message:"User Created!"});

        } 
        catch (error) {
               return res.json({success: false, message: error});
        }
    },
    signIn: async function(req, res){
        try{
            const {email, password} = req.body;

            const foundUser = await UserModel.findOne({email:email}); // returns a boolean value
            if(!foundUser){
                return res.json({success: false, message: "user not found!"});

            }
            //now we have to match the password[from the request body] from foundUser to the actual password
            //foundUser.password is hashed so we will use bcrypt 
            const passwordMatch = bcrypt.compareSync(password, foundUser.password);
            if(!passwordMatch){
                return res.json({success:false, message:"password or email incorrect!"});
            }
            return res.json({success:true,data:foundUser})
        }
        catch(error){
            return res.json({success: false, message: error});
        }
    }                             
}
module.exports = UserController;