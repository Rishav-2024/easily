export const auth = (req, res, next)=>{
    if(req.session.userEmail){
        next();
    }else{
        console.log(req.session.userEmail);
        res.redirect('/404')
    }
}