const {Schema, model} = require('mongoose');

const cartItemSchema = new Schema(
    {
        product:{type:Schema.Types.ObjectId, ref: 'Product'},
        quantity:{type:Number,default:1},
    }
);
const cartSchema = new Schema(
    {
        user:{type:Schema.Types.ObjectId, ref:'User',required: true},
        item:{type:[cartItemSchema],default:[]},
        createdOn:{type:Date},
        updatedOn:{type:Date},

    }
);
cartSchema.pre('save',function(next){
    this.createdOn = new Date();
    this.updatedOn = new Date();
    next();
});
cartSchema.pre(['update','findOneAndUpdate','updateOne'],function(next){
    const update = this.getUpdate();
    delete update._id;
    next();
});

const CartModel = model('cart',cartSchema);
module.exports=CartModel;