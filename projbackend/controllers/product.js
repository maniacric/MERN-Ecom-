const product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");   
const category = require("../models/category");

exports.getProductById = (req,res,next,id)=> {
    product.find(id)
    .exec((err,product)=>{
        if(err||!product){
            res.status(404).json({
                error: "Product Not found"
            })

        }
        req.product = product;
        next();
    })

}

exports.createProducts = (req,res) =>{
    let form= formidable.IncomingForm();
    form.keepExtension = true;
    form.parse(req,(err,fields,files)=>{
        if(err){
            res.status(400).json({
                error: "problem with image"
            })
        }
    //destructing the field
    const  {name , price,description,categoty,stock} = fields;
    if(!name || !price || !description || !categoty || !stock ){
        return res.status(400).json({
            error:"please fill all fields"
        })
    }


    //restrictions on field
    let product = new product(fields);
    if(file.photo){
        if(file.photo.size > 4000000){
            return res.status(400).json({
                error : "Photo is Bigger than 3 MB"
            })
        }
        product.photo.data =fs.readFileSync(file.photo.path);  
        product.photo.contentType = file.photo.type;

    }        
    product.save((err,product)=>{
        res.status(400).json({
            err: "not able to save the data"
            })
        })
    })
}   

exports.getProduct = (req,res)=>{
    req.product.photo = undefined;
    return res.json(req.product);   
}

exports.photo = (req,res,next) =>{

    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType);
        return res.send(req.product.photo.data)
    }
    next();
}

exports.deleteProduct = (req,res) =>{
    let product = req.product;
    product.remove((err,deletedProduct) =>{
        if(err){
            return res.status(400).json({
                err: "failed to delete the product"
            })
        }
        res.json({
            message : "deleted succefully"
        })
    })
}

exports.updateProduct =(req,res) =>{
    
    let form= formidable.IncomingForm();
    form.keepExtension = true;
    form.parse(req,(err,fields,files)=>{
        if(err){
            res.status(400).json({
                error: "problem with image"
            })
        }

    //restrictions on field
    let product = _.extend(product ,fields);

    if(file.photo){
        if(file.photo.size > 4000000){
            return res.status(400).json({
                error : "Photo is Bigger than 3 MB"
            })
        }
        product.photo.data =fs.readFileSync(file.photo.path);  
        product.photo.contentType = file.photo.type;

    }        
    product.save((err,product)=>{
        res.status(400).json({
            err: "not able to update the Tshirt"
            })
        })
    })
    
}


exports.getAllProducts = (req,res)=>{
    Product.find()
    .select("-photo").limit(8)
    .popularte("category")
    .sort([[sortBy,"asc"]])
    .exec(( err,user) => {
        if(err){
          err: "No Product found"
        }
        
        return  res.json (user);
      })    
}

exports.updateStock = (req,res,next) =>{
    let myOperations = req.body.order.products.map(prod =>{
        return{
            updateOne:{
                 filter:{_id: prod._id},
                 update: {$inc: {stock: -prod.count,sold: +prod.count}}
            }
        }
    })
    
    Product.bulkWrite(myOperations,{},(err,products) =>{
        if(err){
            res.status(400).json({
                error: "BULK OPERATION FAILED"
            })
        }
    })
    next();
}   

exports.getAllUniqueCategories =(req,res) =>{
    Products.distinct("category",{}, (err,category)=>{
        if(err){
            res.status(400).json({
                error: "UNABLE TO UPLOAD ALL CATEGORIES"
            })  
    }
    res.send(category);
    })
}