import express from  'express';
import { getGalleryreq, postGaleryreq, deleteGalleryItem} from '../controllers/gallery.controller.js';

const galleryItemRouter = express.Router();



galleryItemRouter.post("/",postGaleryreq);
galleryItemRouter.get("/",getGalleryreq);
galleryItemRouter.delete("/:id",deleteGalleryItem);

export default galleryItemRouter;