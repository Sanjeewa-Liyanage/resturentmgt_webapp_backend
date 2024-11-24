import express from 'express';
import {
    getGalleryreq,
    postGaleryreq,
    deleteGalleryItem,
    updateGalleryItem,
} from '../controllers/gallery.controller.js';

const galleryItemRouter = express.Router();

galleryItemRouter.post("/", postGaleryreq);
galleryItemRouter.get("/", getGalleryreq);
galleryItemRouter.delete("/:id", deleteGalleryItem);
galleryItemRouter.put("/:name", updateGalleryItem);

export default galleryItemRouter;
