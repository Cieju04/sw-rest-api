import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { isEmail } from 'validator';

const userSchema = new mongoose.Schema(
  {
    swCharacter: {
      type: String,
      required: true,
      default: 'No character assing to User'
    },
    swUrl: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: isEmail
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
	if (!this.isModified('password'))
		return next();
	bcrypt.hash(this.password, 10, (err, hash) => {
		if (err) {
			return next(err)
		}
		this.password = hash;
		next();
	})
});

userSchema.methods.comparePassword = function(password) {
	const passwordHash = this.password
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
			
      if (err) {
        return reject(err)
      }

      resolve(same)
    })
  })
}

export const User = mongoose.model('user', userSchema);