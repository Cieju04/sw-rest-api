import { User } from '../models/user';
import {fetchName} from '../utils/resources' 

export const signup = async (req, res) => {
	if (!req.body.email || !req.body.password) {
		return res.status(400).json({
			message: "Please, enter email and password"
		})
	}
	try {
		User.find({
			email: req.body.email
		})
			.exec()
			.then(user => {
				if (user.length >= 1) {
					return res.status(409).json({
						message: "Email already exist"
					})
				} else {
					fetchName()
						.then(async (resolve) => {
							
							const user = await User.create({
								swCharacter: resolve.name,
								swUrl: resolve.url,
								...req.body
							})
							return res.status(201).json({
								message: `You've been choosen by: ${user.swCharacter}`
							})
						})
				}
			})
	} catch (err) {
		res.status(500).json({
			error: err,
			message: "Something goes wrong with fetching API"
		})
	}
}

export const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'Please insert both, email and password' })
	}
	
  try {
    const user = await User.findOne({ email: req.body.email }).exec();

    if (!user) {
      return res.status(401).send({ message: 'Wrong email or password' })
    }

    const match = await user.comparePassword(req.body.password)

    if (!match) {
      return res.status(401).send({ message: 'Wrong email or password' })
    }

    return res.status(200).send({ message: "Succesfull login in" })
  } catch (e) {
    res.status(500).send({
      message: `Somthing went wrong, please enter email and password again`
    })
  }
}