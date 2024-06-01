// backend/routes/admin.js
const express = require('express');
const router = express.Router();
const { adminLogin } = require('../controllers/adminAuthController');

/* POST Methods */
router.route('/login').post(adminLogin);

module.exports = router;
