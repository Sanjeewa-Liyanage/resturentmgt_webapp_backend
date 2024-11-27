//create gallery items
import { isAdminValid } from "./userController.js"
import GalleryItem from "../models/gallery.model.js"


export function postGaleryreq(req, res) {
    try {
        console.log("Request received:", req.body);

        const user = req.user; // Extracted from the token
        if (!user) {
            return res.status(401).json({
                message: "You must be logged in to create a gallery item",
            });
        }

        if (user.type !== "admin") {
            return res.status(403).json({
                message: "You must be an admin to create a gallery item",
            });
        }

        const galleryItem = req.body;

        console.log("Gallery item to be saved:", galleryItem);

        const newGalleryItem = new GalleryItem(galleryItem);

        newGalleryItem
            .save()
            .then(() => {
                res.status(201).json({ message: "Gallery item created successfully" });
            })
            .catch((err) => {
                console.error("Error saving gallery item:", err);
                res.status(500).json({ message: "Error creating gallery item" });
            });
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
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


export function deleteGalleryItem(req, res) {
    const user = req.user;

    // Ensure the user is an admin
    if (!isAdminValid(req)) {
        return res.status(401).json({ message: "You must be an admin to delete a gallery item" });
    }

    const id = req.params.id; // Extract the _id from request parameters

    // Use findByIdAndDelete to delete the document by _id
    GalleryItem.findByIdAndDelete(id)
        .then((deletedItem) => {
            if (!deletedItem) {
                return res.status(404).json({ message: "Gallery item not found" });
            }
            res.status(200).json({ message: "Gallery item deleted successfully" });
        })
        .catch((err) => {
            console.error("Error deleting gallery item:", err);
            res.status(500).json({ message: "Error deleting gallery item" });
        });
}

export function updateGalleryItem(req, res) {
    const user = req.user;

    if (!isAdminValid(req)) {
        return res.status(401).json({ message: "You must be an admin to update a gallery item" });
    }

    const name = req.params.name;

    // Update the gallery item
    GalleryItem.findOneAndUpdate(
        { name: name },
        { $set: req.body },
        { new: true }
    )
        .then((updatedItem) => {
            if (!updatedItem) {
                return res.status(404).json({ message: "Gallery item not found" });
            }
            res.status(200).json({
                message: "Gallery item updated successfully",
                updatedItem,
            });
        })
        .catch((err) => {
            console.error("Error updating gallery item:", err);
            res.status(500).json({ message: "Error updating gallery item", error: err });
        });
}

