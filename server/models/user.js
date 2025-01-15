import mongoose from 'mongoose'

const user = new mongoose.Schema({
  username:{
    type: String,
    required: true,
    unique: true,
    minLength: 5
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required:true,
    minLength: 8
  },
  tasks: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Task'
    }
  ]
}, {timestamps:true})

export const User = mongoose.model('User', user)