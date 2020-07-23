const product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");   

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