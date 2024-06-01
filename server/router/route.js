// backend/routes/flights.js
const express = require('express');
const router = express.Router();
const {
  addFlight,
  editFlight,
  deleteFlight,
  searchFlight,
  bookFlight,
  getBookedFlights
} = require('../controllers/flights');
const { isAuthenticated } = require('../middlewares/authMiddleware');

// Add a new flight
router.post('/add', isAuthenticated, addFlight);

// Edit an existing flight
router.put('/edit/:id', isAuthenticated, editFlight);

// Delete a flight
router.delete('/delete/:id', isAuthenticated, deleteFlight);

// Search for flights
router.post('/search', searchFlight);

// Book a flight
router.post('/book', isAuthenticated, bookFlight);

// Get booked flights
router.get('/booked', isAuthenticated, getBookedFlights);

module.exports = router;
