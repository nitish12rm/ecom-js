const ProductModel = require("../models/product_model");

const productController = {
    createproduct: async function(req,res){
            try {
                //data aaya body me
                const productData = req.body;
                //usko convert kiye model me
                const newproduct = new ProductModel(productData);
                //ab save kardiye database me
                await newproduct.save();
                return res.json({success:true,data:newproduct,message:"product created!"});
            } catch (error) {
                return res.json({success:false, message:error});
            }
    },
    fetchAllProduct: async function(req,res){
            try {
                const products = await ProductModel.find();
                return res.json({success:true,data:products});
            } catch (error) {
                return res.json({success:false,message:error});
            }
    },
    fetchproductById: async function(req,res){
        try
        {
            const id = req.params.id;
            console.log(id);
            const products = await ProductModel.findById(id);
            console.log(products);

            // if(!products)
            // {
            //  return res.json({success:false,message:'product not found'});
            // }

            return res.json({success:true,data:products});
       }
        catch(error)
        {
            return res.json({success:false, message:'product not found'});
        }
    },
    fetchproductByCategory: async function(req,res){
        try
        {
            const categoryId = req.params.id;
           
            const products = await ProductModel.find({category: categoryId});

            // if(!products)
            // {
            //  return res.json({success:false,message:'product not found'});
            // }

            return res.json({success:true,data:products});
       }
        catch(error)
        {
            return res.json({success:false, message:'error'});
        }
    }
};

module.exports = productController;