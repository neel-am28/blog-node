const express = require("express");
const blogController = require("../controllers/blogController");
const multer = require("multer");
const router = express.Router();
const path = require('path');

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// .single('image') is the field name of input type file tag from html file
const upload = multer({ storage: storage }).single("image");

router.get("/add-blog", blogController.get_blogs);

router.post("/add-blog", upload, blogController.post_blogs);

router.get('/edit-blog/:id', blogController.edit_blog);

router.post('/update-blog', upload, blogController.update_blog);

router.get('/delete-blog/:id',  blogController.delete_blog);

module.exports = router;
