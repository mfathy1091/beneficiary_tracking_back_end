import { check, body } from 'express-validator/check'
import UserService from '../services/userService';

const userService = new UserService();

const schema = [
    // check('email')
    //     .isEmail().withMessage('Please enter a valid email')
    //     .notEmpty().withMessage('Email cannot be empty')
    // ,
    check('username')
        .isAlphanumeric().withMessage('Username must contain alphabets and numbers only')
        .isLength({min: 4, max: 32}).withMessage('Username cannot be empty and must have min 4 and max 32 characters')
        .bail()
        .custom(async (username) => {
            const user = await userService.findByUsername(username);
            if(user){
                throw new Error('This user name is already taken!')
            }
        })
    ,
    body(
        'password',
        'Please enter a password ith only numbers and at least 5 characters'
    ).isLength({ min:  5 })
    .isAlphanumeric()
    ,
    body(
        'confirmPassword'
    ).custom((value, {req}) => {
        if (value !== req.body.password){
            throw new Error('Passwords have to match!')
        }
        return true;
    })
]

export { schema as registerSchema }