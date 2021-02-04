const express = require('express');
const router = express.Router();
const { listUsers, newUser, singleUser, login } = require('../controllers/userController');

router.get('/',listUsers);
router.post('/',newUser);
router.get('/:userId',singleUser);
router.post('/login',login);


module.exports = router;