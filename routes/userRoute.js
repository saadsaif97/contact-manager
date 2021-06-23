const express = require('express')

const { check } = require('express-validator')
const { auth } = require('../middleware/auth')


const router = express.Router()
const { createUser, sendAuthenticatedUser } = require('../controllers/userController')

/**
 * @route /api/users POST
 * @desc create user 
 * @return encoded
 */
router.post('/', [
   check('name', 'name is required').not().isEmpty().isString(),
   check('email', 'please enter a valid email').not().isEmpty().isEmail(),
   check('password', 'password must be atleast 6 character long').isString().isLength({ min: 6 }),
], createUser)

/**
 * @route /api/users GET
 * @desc create user 
 * @return encoded
 */
router.get('/', auth, sendAuthenticatedUser)

module.exports = router