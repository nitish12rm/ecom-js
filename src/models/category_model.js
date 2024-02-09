const {Schema, model} = require('mongoose');

const categorySchema = new Schema({
    title: {type:String,required:[true,'title is required'],
    description:{type:String,default:""},
    createdOn:{type: Date},
    updatedOn:{type: Date},

}
});
categorySchema.pre('save',function(next){
    this.createdOn = new Date();
    this.updatedOn = new Date();
    next();
});
categorySchema.pre(['update','findOneUpdate','updateOne'],function(next){
    const update = this.getUpdate();
    delete update._id;
    this.updatedOn = new Date();
});
const CategoryModel = model('Category', categorySchema);
module.exports = CategoryModel;

