// backend/routes/flights.js
const express = require('express');
const router = express.Router();
const { searchFlight, bookFlight, getBookedFlights, getUserDetails, updateUserDetails } = require('../controllers/appController');
const { addFlight, editFlight, deleteFlight } = require('../controllers/flightController');
const { verifyAdminToken } = require('../middleware/authMiddleware');

/* POST Methods */
router.route('/addflight').post(verifyAdminToken, addFlight);
router.route('/bookflight').post(bookFlight);
router.route('/searchflight').post(searchFlight);

/* GET Methods */
router.route('/getbookedflights').get(getBookedFlights);
router.route('/getuserdetails').get(getUserDetails);

/* PUT Methods */
router.route('/updateuserdetails').put(updateUserDetails);
router.route('/updateFlight/:id').put(verifyAdminToken, editFlight);

/* DELETE Methods */
router.route('/deleteFlight/:id').delete(verifyAdminToken, deleteFlight);

module.exports = router;
