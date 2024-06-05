import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

//in this function i created a destination for my img and set name of my img.file
const storage = multer.diskStorage({
  destination(req, file, callback) {
    //i creating in path dist/ for running my project corre
    const uploadDir = 'dist/public/uploads/';

    //if not exist path, this condition created a path
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    callback(null, uploadDir);
  },
  filename(req, file, callback) {
    //in this block created a name for my img, use random name + file name
    const filename = uuidv4() + file.originalname;
    callback(null, filename);
  },
});

export const upload = multer({
  storage: storage,
});
