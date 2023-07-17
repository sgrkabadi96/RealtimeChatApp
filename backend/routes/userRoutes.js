const express = require('express')
const router = express.Router();

const {registerUser ,authUser} = require('../controllers/userController')
const {allUsers} = require('../controllers/allUsers')
const {protect} = require('../middlewares/authMiddleware')

router.route('/login').post(authUser)
router.route('/signup').post(registerUser)
router.route('/').get(protect , allUsers)

module.exports = router;