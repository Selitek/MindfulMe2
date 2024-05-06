const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer");
const postController = require('../controllers/post');
const { ensureAuth } = require('../middleware/auth');
// Route for individual post page
router.get('/:postId',  postController.getPost);
// Route to handle form submission for creating a post
router.post('/makepost',upload.single("file"), postController.createPost);

module.exports = router
