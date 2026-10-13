const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.signup);
router.put('/:id', userController.createOrUpdate);
router.get('/by-email', userController.getUserByEmail);
router.get('/:id', userController.getUserById);

module.exports = router;
