// get, create, delete

import {Task} from "../models/task.js"
import {User} from "../models/user.js"

const createTask = async (req, res) => {
  try {
    let task = new Task();
    task.content = req.body.content;
    task.complete = req.body.complete;
    task.user = req.userId
    await task.save()
    res.status(200).json(task)
  } catch (error) {
    res.status(400).json({message: error})
  }
}

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await User.find({_id: req.userId}).
    populate('tasks').
    exec();
    res.status(200).send(allTasks);
  } catch (error) {
    res.status(400).json({message: error})
  }
}

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete({_id: req.params.task})
    res.status(200).json({message: "Task Deleted"})
  } catch (error) {
    res.status(400).json({message: error})
  }
}

export {createTask, getAllTasks, deleteTask};