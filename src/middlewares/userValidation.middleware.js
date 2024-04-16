import {body, validationResult} from "express-validator";
import UserModel from "../models/user.model.js"

export const userValidation = async (req, res, next)=>{
    const rules = [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').notEmpty().withMessage('Email is required'),
        body('email').isEmail().withMessage('Email should be valid'),
        body('password').notEmpty().withMessage('Password is required'),
        body('password').isLength({ min: 3, max:16 }).withMessage('Password should min 3 & max 16 characters'),
        body('email').custom((value)=>{
            const status = UserModel.checkEmail(value);
            if(status){
                throw new Error('E-mail already in use');
            }else{
                return true
            }
        }),
    ]

    await Promise.all(
        rules.map((rule)=> rule.run(req))
    );
    
    let validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        const error = validationErrors.array()[0].msg
        const htmlContent = `<h1 style="text-align:center; color:red">${error} - <a href="javascript:history.back()">Try Again</a></h1>`;
        return res.send(htmlContent)
    }

    next()
}