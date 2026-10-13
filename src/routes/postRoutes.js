const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/', postController.createPost);
router.delete('/:id', postController.deletePost);
router.get('/details', postController.getAllPostDetails);
router.get('/comment-count', postController.getAllPostCommentCounts);

module.exports = router;
