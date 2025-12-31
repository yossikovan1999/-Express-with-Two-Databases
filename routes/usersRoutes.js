import express from "express";
import HttpError from "../errors/httpError.js";
import authMiddleware from "../middleware/authMiddleware.js";
import * as usersService from "../services/usersService.js";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new HttpError("must pass a paswword and a username.");
    }

    await usersService.addUser(username, password);

    return res.status(201).json({ message: "user added successfully."});
  } catch (error) {
    next(error);
  }
});

router.post("/login", authMiddleware, (req, res, next)=>{
    try{
        return res.status(201).json({message : "user logged in successfully."})
    }catch(error){
        next(error);
    }
})



export default router;
