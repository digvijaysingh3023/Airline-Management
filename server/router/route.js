const {Router} = require('express')
const router = Router();

const { addFlight, bookFlight, getBookedFlights, getUserDetails,updateUserDetails, searchFlight } = require('../controllers/appController');

/* POST Methods */
router.route('/addflight').post(addFlight)
router.route('/bookflight').post(bookFlight)
router.route('/searchflight').post(searchFlight)

/* GET Methods */
router.route('/getbookedflights').get(getBookedFlights)
router.route('/getuserdetails').get(getUserDetails)

/**  PUT Methods */
router.route('/updateuserdetails').put(updateUserDetails)

module.exports = router