import express from "express";
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { createTask, getAllTasks, deleteTask } from "../controllers/tasks.js";
import { createUser, logInUser, getUser } from "../controllers/users.js";

const router = express.Router();

router.route("/register").post(createUser);
router.route("/login").post(logInUser);

const verifyToken = (req, res, next) => {
  if (req.path === "/check-cookie") {
    return next();
  } else {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res
          .status(400)
          .json({ message: "Authentication token is missing" });
      } else if (token) {
        jwt.verify(token, process.env.JWTSecret, (err, decoded) => {
          if (err) {
            return res
              .status(400)
              .json({ message: "Invalid Token. Login to continue." });
          } else {
            req.userId = new mongoose.Types.ObjectId(decoded);
            console.log(`Decoded - ${req.userId}`);
            next();
          }
        });
      }
    } catch (err) {
      console.error("Token verification failed:", err.message);
      return res.status(400).json({ message: "Invalid or expired token" });
    }
  }
};

router.use(verifyToken);

router.route("/check-cookie").get((req, res) => {
  if (req.cookies.token) {
    res.json({ hasCookie: true });
  } else {
    res.json({ hasCookie: false });
  }
});

router.route("/").get(getAllTasks).post(createTask);
router.route("/:task").delete(deleteTask);
router.route("/user").get(getUser);

export default router;
