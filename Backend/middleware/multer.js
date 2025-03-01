import multer from "multer";
import {v4 as uuidv4} from "uuid";


//sanitize the file names to prevent path traversal attacks
const safeFileNames = (file) => {
  return file.originalname.replace(/[^\w.-]/g, "_"); // replace unsafe characters
};

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/"); // Files will be stored in the "uploads" folder
  },

  filename: function (req, file, callback){
    const sanitizedFilename = safeFileNames(file); 
    const UniqueFileName = `${uuidv4()}_${sanitizedFilename}`; //we append the UUID to the filename for uniqueness purposes
    callback(null, UniqueFileName);
  }
});

//filter allowed file types
const fileFilter = (req, file, callback) =>{
    const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedFileTypes.includes(file.mimetype)){
      return callback(new Error('Only images are allowed!'), false);
    }
    callback(null, true);
};

//initialize upload middleware
const upload = multer({ 
  storage, 
  limits:{fileSize: 5 * 1024 * 1024}, //allow max file size of 5mbs
  fileFilter
}); 

export default upload;
