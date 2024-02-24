const express = require('express');
const multer = require('multer');
const {Society_update,fetchSocietyPost}  = require('../Controller/Society.controller')

const router = express.Router();

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

router.post('/computercell', upload.single('file'),Society_update).
get('/computercelldata',fetchSocietyPost)


module.exports =router;
