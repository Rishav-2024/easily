import {body, validationResult} from "express-validator";

export const applyJobValidation = async (req, res, next)=>{
    const rules = [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').notEmpty().withMessage('Email is required'),
        body('email').isEmail().withMessage('Should be a valid Email'),
        body('phone').notEmpty().withMessage('Phone number is required'),
        body('phone').isLength({ min: 10, max:10 }).withMessage('Should be a valid 10 digit phone number'),
        body('resume').custom((value,{req})=>{
            if(!req.file){
                throw new Error("Resume is required & Should be in PDF formate");
            }
            return true
        }),
    ];

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