import multer from "multer";
import {v4 as uuidv4} from "uuid";

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "server/src/static/");
    },
    filename: (req, file, cb) =>{
        const fileName = `${uuidv4()}.jpg`;
        req.fileNames = req.fileNames || [];
        req.fileNames.push(fileName);
        cb(null, fileName);
    }
});
const fileFilter = (req, file, cb) => {

    if(file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"||
        file.mimetype === "image/jpeg"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}

export const upload = multer({storage:storageConfig, fileFilter: fileFilter}).array("images", 10)