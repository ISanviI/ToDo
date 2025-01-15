import mongoose from 'mongoose'
import {User} from '../models/user.js'

const task = new mongoose.Schema({
  content: {
    type: String
  },
  complete: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {timestamps : true})


task.pre('save', async function (next) {
  try {
    await User.findOneAndUpdate(
      { _id: this.user },
      { $push: { tasks: this._id } },
      { new: true }
    );
    console.log("Pushed to subject");
    next()
  } catch (error) {
    console.log(`Error while pushing to subject - ${error}`)
  }
})

export const Task = mongoose.model('Task', task)