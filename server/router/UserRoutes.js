// backend/routes/flights.js
const express = require('express');
const router = express.Router();
const { searchFlight, bookFlight, getBookedFlights, getUserDetails, updateUserDetails } = require('../controllers/appController');



/* GET Methods */
router.route('/getbookedflights').get(getBookedFlights);
router.route('/getuserdetails').get(getUserDetails);

/* POST Methods */
router.route('/bookflight').post(bookFlight);
router.route('/searchflight').post(searchFlight);

/* PUT Methods */
router.route('/updateuserdetails').put(updateUserDetails);


module.exports = router;
