import { User } from '../models/user';
import { verifyToken } from '../utils/tokenUtils'

export const protectRoutes = async (req, res, next) => {
	const bearer = req.headers.authorization
	
	if (!bearer) {
		return res.status(401).send({
			message: 'No authorization - wrong bearer'
		})
	}
  // example bearer = ['', 'iug123273h127yhe28e12u903w12uwj21']
	const token = bearer.split('Bearer ')[1].trim()
	
	let payload
	try {
		payload = await verifyToken(token)
	} catch (e) {
		return res.status(401).send({
			message: 'No authorization - wrong token'
		})
	}

	const user = await User.findById(payload.id)
	.select('-password')
  .exec();
  
	if (!user) {
		return res.status(401).send({
			message: 'No authorization - wrong user'
		})
	}

	req.user = user;
	next();
}