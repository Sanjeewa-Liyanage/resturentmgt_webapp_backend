import Category from "../models/category.model.js";

export function postCategory(req,res){
    const user = req.body.user
    if(user == null){
        res.status(401).json({
            message: "You must be logged in to create a Category"

        })
        return
    }
    if(user.type!="admin"){
        res.status(401).json({
            message: "You must be an admin to create Category"
        })
        return
    }

    const category = req.body.item;
    const newCategory = new Category(category);

    newCategory.save().then(
        ()=>{
            res.status(201).json({
                message: "Category created successfully",
            })
        }
    ).catch(()=>{
        res.status(500).json({
            message: "Failed to create category"
        })
    })
}

export function getCategory(req,res){
    Category.find().then(
        (categories)=>{
            res.status(200).json({
                categories: categories
            })
        }
    ).catch(()=>{
        res.status(500).json({
            message: "Failed to get categories"
        })
    })
}