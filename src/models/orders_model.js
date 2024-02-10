//the schema for order will be as orderSchema but the only difference is that
//we had references for user and product.. whicgh means if some value is changed 
//in the user like phone number or in product like the price 
//then the orders price at the time of purchase will be changes whichg we dont want
//soo instead of refrences, we will have map of user and product

const {Schema, model} = require('mongoose');

const orderItemSchema = new Schema(
    {
        product:{type:Map, required:true},
        quantity:{type:Number,default:1},
    }
);
const orderSchema = new Schema(
    {
        user:{type:Map,required: true},
        item:{type:[orderItemSchema],default:[]},
        status:{type:String,default:""},
        createdOn:{type:Date},
        updatedOn:{type:Date},

    }
);
orderSchema.pre('save',function(next){
    this.createdOn = new Date();
    this.updatedOn = new Date();
    next();
});
orderSchema.pre(['update','findOneAndUpdate','updateOne'],function(next){
    const update = this.getUpdate();
    delete update._id;
    next();
});

const OrderModel = model('order',orderSchema);
module.exports=OrderModel;