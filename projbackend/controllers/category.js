const category = require("../models/category");

exports.getCategoryById = (req,res,next,id) => {
    category.findById(id),exec((err,cate)=> {
        if(err) {
            return res.status(400).json({
                err: "NOT DEFINED"
            })
        }
        req.category=cate;
        next();
    })
}

exports.createCategory = (req,res) =>{
    const category = new Category(req.body);
    category.save((err,category) =>{
        if(err) {
            return res.status(400).json({
                err: "CATEGORY NOT SAVED IN DB"
            })
        }
        res.json(category);
    })

}

exports.getCategory = (req,res) =>{
    return res.json(req.category);

}

exports.getAllCategory = (req,res) =>{
    Category.find().exec((err,items) =>{
        if(err) {
            return res.status(400).json({
                err: "LIST IS EMPTY"
            })
        }
        res.json(items);
    })
}


exports.updateCategory = (req,res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err,updatedCategory) =>{
        if(err) {
            return res.status(400).json({
                error : "Category is not updated"
            });
        }
        res.json(updatedCategory);
    });
}

exports.deleteCategory = (req,res)=>{
    const category = req.category;  
    category.remove((err,category) =>{
        if(err) {
            return res.status(400).json({
                error : "Unable to delete the category"
            });
        }
        res.json({
            message: "$category succesfuly deleted"
        });
    })
}