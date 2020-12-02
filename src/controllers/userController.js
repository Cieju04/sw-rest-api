import { User } from '../models/user';

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true
    }).exec();

    res.status(200).json({ 
      message: "User have been updated",
      data: user })
  } catch (e) {
    console.error(e)
    res.status(400).send({
      message: "something went wrong with user update, please try again"
    })
  }
}

export const removeUser = async (req, res) => {
  try {
    const removed = await User.findByIdAndDelete(req.user._id)

    if (!removed) {
      return res.status(400).json({
        message: "no user to remove"
    })
    }

    return res.status(200).json({ 
      message: "User have been removed",
      data: removed })
  } catch (e) {
    console.error(e)
    res.status(400).send({
      message: "something went wrong with user remove, please try again"
    })
  }
}