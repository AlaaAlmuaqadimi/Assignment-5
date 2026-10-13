const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/', commentController.createBulkComments);
router.patch('/:id', commentController.updateComment);
router.post('/find-or-create', commentController.findOrCreateComment);
router.get('/search', commentController.searchComments);
router.get('/newest/:postId', commentController.getNewestComments);
router.get('/details/:id', commentController.getCommentDetails);

module.exports = router;
