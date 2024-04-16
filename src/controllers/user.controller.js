import JobModel from "../models/job.model.js";
import UserModel from "../models/user.model.js";

export default class UserController {

    // Render the Home page
    getHome(req, res){
        res.render('home', {userEmail: req.session.userEmail, userName:req.session.userName})
    }
    
    // Render the Login page
    getLogin(req, res){
        res.render('login', {errorMsg:null})
    }
    
    // Add the recuiter to the User Model
    registerUser(req, res){
        const user = req.body
        UserModel.addUser(user)
        res.render('login', {errorMsg:null})
    }

    // Checks if the email & password exist in the User Model & render the view accordingly
    loginUser(req, res){
        const {email, password} = req.body
        const user = UserModel.isUser(email, password)
        if(!user){
            return res.render('login', {errorMsg: 'Invalid Credential'})
        }
        req.session.userEmail = email;
        let userName = UserModel.userName(req.session.userEmail)
        req.session.userName = userName
        const jobs = JobModel.getJobs()
        res.redirect('/jobs')
    }

    // Clear the session in order to logout the user & redirect to the home page
    logout(req, res) {
        req.session.destroy((err) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect('/');
          }
        });
    }
}
