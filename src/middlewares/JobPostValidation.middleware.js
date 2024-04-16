import {body, validationResult} from "express-validator";

export const JobPostValidation = async (req, res, next)=>{
    const rules = [
        body('jobCategory').notEmpty().withMessage('Job category is required'),
        body('designation').notEmpty().withMessage('Designation is required'),
        body('location').notEmpty().withMessage('Location is required'),
        body('companyName').notEmpty().withMessage('Company name is required'),
        body('salary').notEmpty().withMessage('Salary is required'),
        body('position').notEmpty().withMessage('Position is required'),
        body('skills').notEmpty().withMessage('Skills is required'),
        body('skills').isArray().withMessage('Should be min 2 skill required'),
        body('applyBy').notEmpty().withMessage('ApplyBy is required'),
    ]

    await Promise.all(
        rules.map((rule)=> rule.run(req))
    );

    let validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        console.log(validationErrors.array()[0].msg);
        const error = validationErrors.array()[0].msg
        const htmlContent = `<h1 style="text-align:center; color:red">${error} - <a href="javascript:history.back()">Try Again</a></h1>`;
        return res.send(htmlContent)
    }

    next()
}