import JobModel from "../models/job.model.js";
export default class JobsController {

    // Get all jobs from Jobs Model
    getJobs(req, res){
        const jobs = JobModel.getJobs()
        res.render('jobs', {userEmail: req.session.userEmail, userName:req.session.userName, jobs})
    }
    
    // Render job post form
    getpostjob(req, res){
        res.render("jobPostForm", {userEmail: req.session.userEmail, userName:req.session.userName, error:null})
    }

    // Post new job by recruiters
    postjob(req, res){
        const job = req.body;
        const recruiterEmail = req.session.userEmail
        JobModel.addJob(job,[],recruiterEmail);
        res.redirect('/jobs')
    }

    // Get a job by id from job model
    getJob(req, res){
        const id = req.params.id
        const job = JobModel.getJobById(id)
        if(job){
            res.render('jobDetail', {userEmail: req.session.userEmail, userName:req.session.userName, job:job})
        }else{
            res.redirect('/404')
        }
    }
    
    // Render update form for a job fetched from job model by id
    getUpdateJob(req, res){
        const id = req.params.id
        const job = JobModel.getJobById(id)
        const userEmail = req.session.userEmail
        if(job.recruiterEmail == userEmail){
            res.render('updateJob', {userEmail: req.session.userEmail, userName:req.session.userName, job})
        }else{
            const msg = "You can only edit the jobs you've posted"
            res.render('404', {userEmail: req.session.userEmail, userName:req.session.userName, msg} )
        }

    }

    // Update the selected job using updateJob function from job model
    postUpdateJob(req, res){
        const updatedJob = req.body
        JobModel.updateJob(updatedJob)
        res.redirect(`/job/${updatedJob.id}`)
    }

    // Delete the selected job using deleteJob function from job model by id
    deleteJob(req, res){
        const id = req.params.id;
        const job = JobModel.getJobById(id);
        const userEmail = req.session.userEmail
        if(job.recruiterEmail == userEmail){
            JobModel.deleteJob(job)
            res.redirect('/jobs')
        }else{
            const msg = "You can only remove the jobs you've posted"
            res.render('404', {userEmail: req.session.userEmail, userName:req.session.userName, msg} )
        }
    }

    // Render applicants who applied the job & only the recuiter of that job can see the applicants
    getApplicants(req, res){
        const id = req.params.id
        const job = JobModel.getJobById(id);
        const userEmail = req.session.userEmail
        if(job.recruiterEmail == userEmail){
            res.render('applicants', {userEmail: req.session.userEmail, userName:req.session.userName, job})
        }else{
            const msg = "You can see only the people who applied to your job"
            res.render('404', {userEmail: req.session.userEmail, userName:req.session.userName, msg} )
        }
    }

    // Job seekers can apply for the job & they will receive a confirmation email as well & resume will be saved using multer on resume folder under Public folder.
    postApplyJob(req, res){
        const {name, email, phone} = req.body
        const resume = '/resumes/' + req.file.filename
        const id = req.params.id
        JobModel.addApplicant(id, name, email, phone, resume)
        JobModel.sendConfirmation(email)
        res.redirect(`/job/${id}`)
    }

    // Searched feature for searching the jobs by company name
    seachedJobs(req , res){
        const {company} = req.body;
        const jobs = JobModel.searchJobs(company)
        res.render('jobs',{userEmail: req.session.userEmail, userName:req.session.userName, jobs})
    }

    // Render the 404 page if the user don't have the permission to access
    errorPage(req, res){
        const msg = "Only recruiter is allowed to access this page"
        res.render('404', {userEmail: req.session.userEmail, userName:req.session.userName, msg} )
    }
    
    // Redirect if the user enter any invalid route
    worngUrl(req, res){
        res.redirect('/')
    }

}