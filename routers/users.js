const express = require('express');
const router = express.Router();
const { listUsers, newUser } = require('../controllers/userController');

router.get('/',listUsers);
router.post('/',newUser);


module.exports = router;