import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const storage = multer.diskStorage({
  destination(req, file, callback) {
    const uploadDir = 'dist/public/uploads/';

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    callback(null, uploadDir);
  },
  filename(req, file, callback) {
    const filename = uuidv4() + file.originalname;
    callback(null, filename);
  },
});

export const upload = multer({
  storage: storage,
});
