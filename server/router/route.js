const {Router} = require('express')
const router = Router();

const { login, register, getUser, generateOTP, verifyOTP, createResetSession, updateUser, resetPassword } = require('../controllers/appController');

/* POST Methods */

router.route('/register').post(register) // register user
// router.route('/registerMail').post() // send the mail
router.route('/authenticate').post((req,res)=>{res.end()}) // authenicate user
router.route('/login').post(login) // login user

/* GET Methods */

router.route('/user/:username').get(getUser) //user with username
router.route('/generateOTP').get(generateOTP) // generate random OTP
router.route('/verifyOTP').get(verifyOTP) //verify generated OTP
router.route('/createResetSession').get(createResetSession) // reset all the variables


/* PUT Methods */
router.route('/updateuser').put(updateUser) // is used to update user profile
router.route('/resetPassword').put(resetPassword) // is use to reset password


module.exports = router