const express = require('express');
const router = express.Router();
const { listUsers, newUser, singleUser, login, countUsers, deleteUser } = require('../controllers/userController');

router.get('/',listUsers);
router.post('/register',newUser);
router.get('/:userId',singleUser);
router.post('/login',login);
router.get('/get/count',countUsers);
router.delete('/:userId',deleteUser);


module.exports = router;