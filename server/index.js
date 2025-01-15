import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()
import cors from 'cors';
import cookieParser from 'cookie-parser';

import routes from './routes/routes.js'

const app = express()
const port = process.env.PORT

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())
app.use(cookieParser());
app.use('/api/v1', routes)

async function start () {
  try {
    await mongoose.connect(process.env.URI).then(() => {
      console.log("Connected with Database.")
    }).then(() => {
      app.listen(port, () => {
        console.log(`App listening on port ${port}...`)
      })
    })
  } catch (error) {
    console.log(`Error occured - ${error}`)
  }
}

start()