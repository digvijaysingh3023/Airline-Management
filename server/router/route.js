const {Router} = require('express')
const router = Router();

const { addFlight, bookFlight } = require('../controllers/appController');

/* POST Methods */
router.route('/addflight').post(addFlight)
router.route('/bookflight').post(bookFlight)

/* GET Methods */



module.exports = router