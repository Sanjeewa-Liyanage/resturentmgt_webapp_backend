import Category from "../models/category.model.js";
import {isAdminValid} from "./userController.js";

export function postCategory(req,res){
    const user = req.user
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

    const newCategory = new Category(req.body);

    newCategory.save().then(
        (result)=>{
            res.status(201).json({
                message: "Category created successfully",
                result: result
            })
        }
    ).catch((err)=>{
        res.status(500).json({
            message: "Failed to create category",
            error: err
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
    ).catch((err)=>{
        res.status(500).json({
            message: "Failed to get categories",
            error: err
        })
    })
}

//delete category
export function deleteCategory(req,res){
    const user = req.user
    if(user == null){
        res.status(401).json({
            message: "You must be logged in to delete a Category"

        })
        return
    }
    if(user.type!="admin"){
        res.status(401).json({
            message: "You must be an admin to delete a Category"
        })
        return
    }

    const name = req.params.name;
    Category.findOneAndDelete({name:name}).then(
        ()=>{
            res.status(200).json({
                message: "Category deleted successfully",
                
            })
        }
    ).catch((err)=>{
        res.status(500).json({
            message: "Failed to delete category",
            error: err
        })
    })
}

//get all categories
export function getallCategory(req,res){
    Category.find().then(
        (result)=>{
            res.status(200).jason({
                categories: result
            })
        }
    ).catch((err)=>{
        res.status(500).json({
            message: "Failed to get categories",
            error: err
        })
    })
}

export function getCategoryByName(req,res){
    const name = req.params.name;
    Category.findOne({name:name}).then(
        (result)=>{
            if(result!=null){
                res.status(200).json({
                    category: result
                })
            }else{
                res.status(404).json({
                    message: "Category not found"
                })
            }
        }
    ).catch((err)=>{
        res.status(500).json({
            message: "Failed to get category",
            error: err
        })
    })
}


//update category
export function updateCategory(req,res){
   
   if(!isAdminValid(req)){
       res.status(401).json({
           message: "You must be an admin to update a category"
       })
       return
   }
   const name = req.params.name;
    Category.updateOne({name:name},req.body).then(
        (result)=>{
            res.status(200).json({
                message: "Category updated successfully",
                result: result
            })
        }
    ).catch((err)=>{
        res.status(500).json({
            message: "Failed to update category",
            error: err
        })
    })
    

}

//admin validation 
