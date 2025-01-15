import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
import {User} from '../models/user.js'

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userName = await User.findOne({ username: username });
    const userMail = await User.findOne({ email: email });

    if (!(username && email && password)) {
      res.status(400).json({message: 'All fields are compulsory'})
    } else if (userName || userMail) {
      res.status(400).json({message: 'User already exists. Try changing username or mailId'})
    } else {
      const encPassword = await bcrypt.hash(password, 10);
      const userData = await User.create({
        username: username,
        email: email,
        password: encPassword,
      });
  
      console.log(`Secret - ${process.env.JWTSecret}`)
      const token = jwt.sign(
        { id: userData._id},
        process.env.JWTSecret,
        {
          algorithm: "HS256",
          expiresIn: "1h",
        },
      );
      // userData.token = token;
      // userData.password = undefined;
  
      // res.status(200).json({token: token});
      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'none', //protect against CSRF
        maxAge: 3600000
      });
    }
  } catch (error) {
    console.log(`Error occured while registering - ${error}`)
    res.status(400).json({message: error})
  }
}

const logInUser = async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await User.findOne({email: email})
    
    if (!(email && password)) {
      return res.status(400).json({message: 'Both are required fields.'})
    } else if (!user) {
      return res.status(400).json({message: 'User not found'})
    } else if (user) {
      const validPass = await bcrypt.compare(password, user.password)
      if (!validPass) {
        return res.status(400).json({message: 'Invalid Password'})
      } else {
        const token = jwt.sign(
          {id: user.id},
          process.env.JWTSecret,
          {
            algorithm: 'HS256',
            expiresIn: '12h'
          }
        )

        res.cookie('token', token, {
          httpOnly: true,
          // domain: 
          secure: false,
          sameSite: 'none', //protect against CSRF
          expires:new Date(Date.now() + 12*60*60*1000)
        }).status(200).json({message: 'LoggedIn Successfully'});
      }
    }
  } catch (error) {
    console.log(`Error occured while logging - ${error}`)
    res.status(400).json({message: error})
  }
}

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    res.status(200).json(user)
  } catch (error) {
    console.log(`Error occured while fetching user - ${error}`)
    res.status(400).json({message: error})
  }
}

export {createUser, logInUser, getUser};