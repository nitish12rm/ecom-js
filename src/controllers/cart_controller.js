const CartModel = require("../models/cart_model");

const CartController = {
    fetchCart: async function(req,res){
       try {
        const user = req.params.id;
        console.log(user);
        const foundCart = await CartModel.findOne({user:user},{new:trueÍÍÍ});
        if(!foundCart){
            return res.json({success:true,message:"no cart :("})
        }
        
        return res.json({success:true, data:foundCart.item, message:"fetched succesfully"})}
        catch(error){
            return res.json({success:false, message:error});
        }
    },
    addToCart: async function(req,res){
        try {
            const {user,product,quantity} = req.body;
            //if cart of a user already exists
            const foundCart = await CartModel.findOne({user:user});
            if(!foundCart){
                const newCart = new CartModel({user:user});
                newCart.item.push({
                    product:product,
                    quantity:quantity,
                });
                await newCart.save();
                return res.json({success:true, data:newCart,message:'product added to cart'});
            }
          const updatedCart=  await CartModel.findOneAndUpdate(
                 {user:user},//dhundega mongo me for this id
                 {$push:{item:{product:product,quantity:quantity}}},//uss table me push karega
                 {new:true},//update hone ke bad wo new updated value return karega warna purana he karta
                );
                return res.json({success:true, data:updatedCart,message:'product added to cart'});

        } catch (error) {
            return res.json({success:true, data:updatedCart,message:error});

        }
    },
    removeFromCart: async function(req,res){
            try {
               const {product, user} = req.body;
               const update = await CartModel.findOneAndUpdate(
                
                    {user:user},
                    {$pull:{item:{product:product}}},
                
               );
               return res.json({success:true,data:update,message:'Removed succesfuly'});

            } catch (error) {
                return res.json({success:false,message:error});
            }
    }
}
module.exports = CartController;