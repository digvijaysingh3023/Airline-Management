const {Router} = require('express')
const router = Router();

const { login, register } = require('../controllers/appController');

/* POST Methods */

router.route('/register').post(register) // register user
router.route('/authenticate').post((req,res)=>{res.end()}) // authenicate user
router.route('/login').post(login) // login user

/* GET Methods */


module.exports = router