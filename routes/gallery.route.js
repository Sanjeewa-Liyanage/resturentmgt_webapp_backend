import express from  'express';
import { getGalleryreq, postGaleryreq } from '../controllers/gallery.controller.js';

const galleryItemRouter = express.Router();



galleryItemRouter.post("/",postGaleryreq);
galleryItemRouter.get("/",getGalleryreq);

export default galleryItemRouter;