import express from  'express';
import { deleteCategory, getCategory,postCategory,getallCategory, getCategoryByName, updateCategory,  } from '../controllers/category.controller.js';

const categoryRouter = express.Router();
categoryRouter.get("/", getCategory);
categoryRouter.post("/",postCategory);

categoryRouter.delete("/:name",deleteCategory );
categoryRouter.get("/:name",getCategoryByName);
categoryRouter.get("/", getallCategory);

categoryRouter.put("/:name",updateCategory);

export default categoryRouter;