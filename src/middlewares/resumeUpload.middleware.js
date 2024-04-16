import multer from "multer";

const storageConfig = multer.diskStorage({
    destination:(req, file, cd)=>{
        cd(null, 'Public/resumes');
    },
    filename:(req, file, cb)=>{
        const name = Date.now() + "-" + file.originalname
        cb(null, name)
    },
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['application/pdf'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    }else{
        cb(null, false)
    }
};


export const uploadFile = multer({
    storage:storageConfig,
    fileFilter: fileFilter,
})