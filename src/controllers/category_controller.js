const CategoryModel = require("../models/category_model");

const categoryController = {
    createCategory: async function(req,res){
            try {
                //data aaya body me
                const categoryData = req.body;
                //usko convert kiye model me
                const newCategory = new CategoryModel(categoryData);
                //ab save kardiye database me
                await newCategory.save();
                return res.json({success:true,data:newCategory,message:"category created!"});
            } catch (error) {
                return res.json({success:false, message:error});
            }
    },
    fetchAllCategories: async function(req,res){
            try {
                const categories = await CategoryModel.find();
                return res.json({success:true,data:categories});
            } catch (error) {
                return res.json({success:false,message:error});
            }
    },
    fetchCategoryById: async function(req,res){
        try
        {
            const id = req.params.id;
            console.log(id);
            const categories = await CategoryModel.findById(id);
            console.log(categories);

            // if(!categories)
            // {
            //  return res.json({success:false,message:'category not found'});
            // }

            return res.json({success:true,data:categories});
       }
        catch(error)
        {
            return res.json({success:false, message:'category not found'});
        }
    }
};

module.exports = categoryController;