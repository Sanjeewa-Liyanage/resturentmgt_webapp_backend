//create gallery items

import GalleryItem from "../models/gallery.model.js"

export function postGaleryreq(req,res) {
    const user = req.body.user
    if(user==null){
         res.status(401).json({
            message: "You must be logged in to create a gellery item"

        })
        return
    }
    if(user.type!="admin"){
        res.status(401).json({
            message: "You must be an admin to create a gallery item"
        })
        return
    }
     
    const galleryItem = req.body.item;

    const newGalleryItem = new GalleryItem(galleryItem)

    newGalleryItem.save().then(
        ()=>{
            res.status(201).json({message: "Gallery item created successfully"})
        }
    ).catch(()=>{
        res.status(500).json({message: "Error creating gallery item"})
    })
    
}

export function getGalleryreq(req,res){
    GalleryItem.find().then(
    (list)=>{
        res.status(200).json({list:list})
    }    
    ).catch(()=>{
        res.status(500).json({message: "Error fetching gallery items"})
    })
}