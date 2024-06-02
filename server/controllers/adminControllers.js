// backend/controllers/flights.js
const User = require('../model/User.model');
const Flight = require('../model/Flight.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const adminCredentials = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD
};

const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    if (email === adminCredentials.email && password === adminCredentials.password) {
        const token = jwt.sign({ email: adminCredentials.email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '12h' });
        return res.status(200).json({ status: 'ok', token });
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
};

async function addFlight(req, res) {
    const { flightNo, to, from, category, totalSeats, date, time } = req.body;
    const date_ = new Date(date);
    try {
        const flight = new Flight({ flightNo, to, from, category, totalSeats, date: date_, time });
        await flight.save();

        return res.status(201).json({ status: 'ok', message: `New Flight created with flightNo- ${flightNo}` });

    } catch (error) {
        const errorcode = error['errorResponse'];
        if (errorcode && errorcode['code'] === 11000) {
            return res.status(400).json({ error: "This Flight number Already Exists" });
        }
        const errormessage = "Cannot add flight Now. Try again later.";
        return res.status(500).json({ error: errormessage });
    }
}

async function editFlight(req, res) {
    const { id } = req.params;
    const { flightNo, to, from, category, totalSeats, date, time } = req.body;

    try {
        const flight = await Flight.findById(id);
        if (!flight) {
            return res.status(404).json({ error: 'Flight not found' });
        }

        if (flightNo) flight.flightNo = flightNo;
        if (to) flight.to = to;
        if (from) flight.from = from;
        if (category) flight.category = category;
        if (totalSeats) flight.totalSeats = totalSeats;
        if (date) flight.date = new Date(date);
        if (time) flight.time = time;

        await flight.save();

        return res.status(200).json({ status: 'ok', message: `Flight with flightNo- ${flightNo} updated successfully` });

    } catch (error) {
        return res.status(500).json({ error: "Cannot update flight now. Try again later." });
    }
}

async function deleteFlight(req, res) {
    const { id } = req.params;

    try {
        const flight = await Flight.findById(id);
        if (!flight) {
            return res.status(404).json({ error: 'Flight not found' });
        }

        await flight.remove();

        return res.status(200).json({ status: 'ok', message: `Flight with flightNo- ${flight.flightNo} deleted successfully` });

    } catch (error) {
        return res.status(500).json({ error: "Cannot delete flight now. Try again later." });
    }
}

module.exports = {
    addFlight,
    editFlight,
    deleteFlight,
    adminLogin,
};
