import express from 'express';
import { examineInquery, getInqueries, postInquery } from '../controllers/inquery.controller';

const inqueryRouter = express.Router();

inqueryRouter.post("/",postInquery);
inqueryRouter.get("/",getInqueries);
inqueryRouter.put("/examine/:inqueryId",examineInquery);
inqueryRouter.put("/reject/:inqueryId",examineInquery);

export default inqueryRouter;
