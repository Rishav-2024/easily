import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export default class JobModel {
    constructor(id, companyName, jobCategory, designation, location, salary, position, skills, applyBy, jobPostDate, applicants){
        this.id = id;
        this.companyName = companyName;
        this.jobCategory = jobCategory;
        this.designation = designation;
        this.location = location;
        this.salary = salary;
        this.position = position;
        this.skills = skills;
        this.applyBy = applyBy;
        this.jobPostDate = jobPostDate;
        this.applicants = applicants;
    }

    static getJobs(){
        return jobs
    }

    static searchJobs(companyName){
        return jobs.filter(job => (job.companyName).toLowerCase().includes(companyName.toLowerCase()))
    }

    static getJobById(id){
        return jobs.find(job=> job.id == id);
    }

    static addJob(job, applicants, recruiterEmail){
        const {companyName, jobCategory, designation, location, salary, position, skills, applyBy} = job;
        const id = jobs.length + 1;
        const jobPostDate =  new Date().toLocaleString().toUpperCase();
        const totalApplicants = applicants.length 
        const newJob = {
            id,
            companyName, 
            jobCategory, 
            designation, 
            location, 
            salary, 
            position, 
            skills, 
            applyBy,
            jobPostDate,
            totalApplicants,
            applicants,
            recruiterEmail
        }
        jobs.push(newJob);
        return jobs
    }

    static updateJob(updateJob){
        const index = jobs.findIndex(job => job.id == updateJob.id);

        const {totalApplicants, jobPostDate, applicants,recruiterEmail } = jobs[index]

        jobs[index] = updateJob;

        jobs[index].totalApplicants = totalApplicants;
        jobs[index].jobPostDate = jobPostDate;
        jobs[index].applicants = applicants;
        jobs[index].recruiterEmail = recruiterEmail
    }

    static deleteJob(id){
        const index = jobs.findIndex(job => job.id == id);
        jobs.splice(index, 1);
    }

    static addApplicant(id, name,email,phone,resume){
        const job = jobs.find(job=> job.id == id)
        job.applicants.push({name, email, phone, resume})
        job.totalApplicants = job.applicants.length
    }

    static sendConfirmation =  (email)=>{
        const transpoter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: 'codingninjas2k16@gmail.com',
                pass: 'slwvvlczduktvhdj',
            },
        })
    
        var htmlstream = fs.createReadStream(path.join("Public", "confirmation.html"));
        
        let mailOption = {
            from:'codingninjas2k16@gmail.com',
            to: email,
            subject: 'Coding Ninjas',
            html:htmlstream,
            }
        try{
            const result =  transpoter.sendMail(mailOption);
            console.log("Success: Email sent to "+ email);
        }catch(err){
            console.log("Email send failed due to: "+ err);
        }
    }
}


var jobs = []

JobModel.addJob({
    companyName:"Apple", 
    jobCategory:"Tech",
    designation:"SDE",
    location:"Noida",
    salary:"14-15 LPA",
    position:2,
    skills:["React", "NodeJs", "Express", "MongoDB", "DSA"],
    applyBy:"2023-12-18",
},[{
    "name": "Rishav Jaiswal",
    "email": "rishavjaiswal02@gmail.com",
    "phone":8709438667,
    "resume":"/resumes/resume.2.pdf"
},{
    "name": "Chotu Sharma",
    "email": "Chotu@gmail.com",
    "phone":8789456546,
    "resume":"/resumes/resume.1.pdf"
}], "rishav@gmail.com")

JobModel.addJob({
    companyName:"Coding Ninjas", 
    jobCategory:"Tech",
    designation:"MERN Developer",
    location:"Delhi",
    salary:"12-14 LPA",
    position:2,
    skills:["React", "NodeJs", "Express", "MongoDB"],
    applyBy:"2023-12-16",
},[{
    "name": "Rishav Jaiswal",
    "email": "rishav@gmail.com",
    "phone":8709438655,
    "resume":"/resumes/resume.1.pdf"
}], "rishav@gmail.com")

JobModel.addJob({
    companyName:"Amazon", 
    jobCategory:"Non Tech",
    designation:"HR",
    location:"Noida",
    salary:"8-10 LPA",
    position:2,
    skills:["React", "NodeJs", "Express", "DSA"],
    applyBy:"2023-12-29",
},[{
    "name": "Rishav Jaiswal",
    "email": "rishav@gmail.com",
    "phone":8709438655,
    "resume":"/resumes/resume.1.pdf"
}], "rishav@gmail.com")
