// middleware/multer.js
import multer from 'multer';

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  }
});

const upload = multer({ storage });

export default upload;
