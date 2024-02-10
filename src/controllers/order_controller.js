const OrderModel = require("../models/orders_model");

const OrderController = {
    createOrder: async function(req,res){
        try {
            const {user,item} = req.body;
            const newOrder = new OrderModel({
                user:user,
                item:item,
            });
            await newOrder.save();
            return res.json({success:true, data:newOrder, message: "order created"});
        } catch (error) {
            return res.json({success:false, message:error});
        }
    },
    fetchUserOrder: async function(req, res){
        try{
            const userId = req.params.id;
        const foundOrder = await OrderModel.find({
            'user.id':userId
        }) ;
        return res.json({success:true, data:foundOrder})}catch(error){
        }
    },
    updateOrderStatus: async function(req, res){
        try{
            console.log("gthfthgfgfg");
            const {orderId, status} = req.body;
            console.log(orderId+" "+status);
        const updatedOrder = await OrderModel.findOneAndUpdate(
            {_id:orderId },
            {status:status},
            {new:true},
            ) ;
        return res.json({success:true, data:updatedOrder})}
        catch(error){
            console.log("gthfthgfgfg");
            return res.json({success:false, message:error});
        }
        
    }
    
}
module.exports = OrderController;