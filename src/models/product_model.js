const {Schema, model} = require('mongoose');

const productSchema = new Schema(
    {
        //every product belongs to a category so we will have to connect the product with the category
        //to do that we can have a categoryID property
        category:{type: Schema.Types.ObjectId,required:true, ref: 'Category' }, 
        title:{type:String,required:true},
        description:{type:String,default:""},
        price:{type:Number,required:true},
        updatedOn: {type: Date},
        createdn: {type:Date}
    }
);

productSchema.pre('save',function(next){
    this.createdOn = new Date();
    this.updatedOn = new Date();
    next();
})
productSchema.pre(['update','findOneAndUpdate','updateOne'],function(next){
    const update = this.getUpdate();
    delete update._id;

    this.updatedOn = new Date;
    next();
});
const ProductModel = model('Product',productSchema);
module.exports = ProductModel;