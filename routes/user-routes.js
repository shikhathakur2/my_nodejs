const express = require('express');

const userControllers = require('../controllers/users-controller');
console.log("inside userControllers ",userControllers)
const router = express.Router();

router.get('/', userControllers.getUser);

router.post('/signup', userControllers.getSingup);
router.post('/login', userControllers.login);

module.exports = router;
 