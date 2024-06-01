const {Router} = require('express');
const { register,login } = require('../controllers/authControllers');
const router = Router();


/* POST Methods */

router.route('/register').post(register) // register user
router.route('/authenticate').post((req,res)=>{res.end()}) // authenicate user
router.route('/login').post(login) // login user

/* GET Methods */


module.exports = router