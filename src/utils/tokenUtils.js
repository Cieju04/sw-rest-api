import jwt from 'jsonwebtoken';

export const generateToken = user => {
	return jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: '1800s' });
}

export const verifyToken = token =>
	new Promise((resolve, reject) => {
		jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
			if (err) return reject(err)
			resolve(payload)
		})
	})



