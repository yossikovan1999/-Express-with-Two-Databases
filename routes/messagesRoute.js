import express from "express";
import HttpError from "../errors/httpError.js";
import authMiddleware from "../middleware/authMiddleware.js";
import * as messageService from "../services/messageService.js";

const router = express.Router();


router.post("/", async (req, res, next) => {
  try {
    const { userId, username, content } = req.body;
    await messageService.addMessage(userId, username, content);
    return res.status(201).json({message : "message added successfully."})
  } catch (error) {
    next(error);
  }
});


router.get("/", async (req, res, next)=>{
  try{
    const result = await messageService.getAllMessages()
    return res.status(201).json(result);
  }catch(error){
    next(error);
  } 
})


router.get("/user/:userId", async (req, res, next)=>{

  try{
    const {username} = req.body;
    const {userId} = req.params;
    const result = await messageService.getMessagesByUser(username, userId);
    return res.status(201).json(result);
  }catch(error){
    next(error);
  }
})


router.put("/:msgId", async (req, res, next)=>{

  try{
    const {username, content, userId} = req.body;
    const {msgId} = req.params;
    await messageService.updateMessage(username, content, msgId);
    return res.status(201).json({message : "user update successfully."});
  }catch(error){
    next(error);
  }
})

router.delete("/:msgId", async (req, res, next)=>{

  try{
    const {username} = req.body;
    const {msgId} = req.params;
    await messageService.deleteMessage(username, msgId);
    return res.status(201).json({message : "user deleted "})
  }catch(error){
    next(error);
  }

})


export default router;
