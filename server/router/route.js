// backend/routes/flights.js
const express = require('express');
const router = express.Router();
const { searchFlight, bookFlight, getBookedFlights, getUserDetails, updateUserDetails } = require('../controllers/appController');
const { addFlight, editFlight, deleteFlight, } = require('../controllers/adminControllers');

/* POST Methods */
router.route('/addflight').post(addFlight)
router.route('/bookflight').post(bookFlight)
router.route('/searchflight').post(searchFlight)


/* GET Methods */
router.route('/getbookedflights').get(getBookedFlights)
router.route('/getuserdetails').get(getUserDetails)

/**  PUT Methods */
router.route('/updateuserdetails').put(updateUserDetails)
router.route('/updateFlight/:id').put(editFlight)

/**DELETE Methods */
router.route('/deleteFlight/:id').delete(deleteFlight)

module.exports = router;
