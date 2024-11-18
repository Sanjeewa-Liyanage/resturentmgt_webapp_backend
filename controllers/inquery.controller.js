import Inquery from "../models/inquery.model.js";
import { isAdminValid, isCustomerValid } from "./userController.js";


//post inquery 
export function postInquery(req, res) {
   if(!isCustomerValid(req)){
       res.status(401).json({
           message:"Unauthorized"
       });
       return;
   }

    const StartingInqueryId = 0;
    Inquery.countDocuments({}).then(count => {
        const newId = StartingInqueryId + count + 1;
        const inquery = new Inquery({
            inqueryId: newId,
            user: req.user.id,
            roomId: req.body.roomId,
            content: req.body.content,
            timeStamp: req.body.timeStamp || Date.now(),
            status: req.body.status || "pending",
            response: req.body.response || ""
        });
        inquery.save().then(result => {
            res.status(200).json({
                message: "Inquery posted",
                inquery: result
            });
        }).catch(err => {
            res.status(500).json({
                message: "Inquery not posted",
                error: err
            });
        });
    }).catch(err => {
        res.status(500).json({
            message: "Inquery not posted",
            error: err
        });
    });
}
//examine inquery
export function examineInquery(req, res) {
    if(!isAdminValid(req)){
        res.status(401).json({
            message:"Unauthorized"
        });
        return;
    }
    const inqueryId = req.params.inqueryId;
    const response = req.body.response;
    if(!response){
        res.status(400).json({
            message:"Response is required"
        });
        return;
    }Inquery.findOneAndUpdate(
        {inqueryId:inqueryId},
        {status:"responsed",response:response}
    ).then(result => {
      if(!result){
          res.status(404).json({
              message:"Inquery not found"
          });
          return;
      }else{
            res.status(200).json({
                message:"Inquery responsed",
                inquery:result
            });
      }
    })
    .catch(err => {
        res.status(500).json({
            message: "Inquery not responsed",
            error: err
        });
    });
}
//reject inquery
export function rejectInquery(req, res) {
    if(!isAdminValid(req)){
        res.status(401).json({
            message:"Unauthorized"
        });
        return;
    }
    const inqueryId = req.params.inqueryId;
    const response = req.body.response;
    Inquery.findOneAndUpdate(
        {inqueryId:inqueryId},
        {status:"rejected",response:response}
    ).then(result => {
      if(!result){
          res.status(404).json({
              message:"Inquery not found"
          });
          return;
      }else{
            res.status(200).json({
                message:"Inquery rejected",
                inquery:result
            });
      }
    })
    .catch(err => {
        res.status(500).json({
            message: "Inquery not rejected",
            error: err
        });
    });
}
//get all inqueries
export function getInqueries(req, res) {
    if(!isAdminValid(req)){
        res.status(401).json({
            message:"Unauthorized"
        });
        return;
    }
    Inquery.find().then(result => {
        res.status(200).json({
            message: "Inqueries fetched",
            inqueries: result
        });
    }).catch(err => {
        res.status(500).json({
            message: "Inqueries not fetched",
            error: err
        });
    });
}