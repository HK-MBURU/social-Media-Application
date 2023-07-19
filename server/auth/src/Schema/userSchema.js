const joi = require("joi");

const newUserSchema = joi.object({
  fullNames: joi.string().required().min(3).max(30),
  userName: joi.string().required().min(3).max(20),
  email: joi.string().required().min(8).max(50),
  password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
  phoneNumber: joi.string().required().min(10).max(16),
  imgUrl: joi.string(),
  bio: joi.string().min(10),
  location: joi.string().min(3).max(50),
  confirmPassword: joi.ref('password')
}).with('password','confirmPassword')

module.exports={newUserSchema}