const User = require('../model/User.model')
const Flight = require('../model/Flight.model')
const dotenv = require('dotenv');
dotenv.config()


async function getUser(req, res) {
    res.json('getUser route')
}

async function updateUser(req, res) {
    res.json('updateUser route')
}

async function addFlight(req, res) {
    const { flightNo, to, from, category, totalSeats } = req.body;

    try {
        const flight = new Flight({ flightNo, to, from, category, totalSeats })
        await flight.save()

        return res.status(201).json({ status: 'ok', message: `New Flight created with flightNo- ${flightNo}` })

    } catch (error) {
        console.log(error);
        const errorcode = error['errorResponse']
        if (errorcode && errorcode['code'] === 11000) {
            return res.status(400).json({ error: "This Flight number Already Exists" })
        }
        const errormessage = "Cannot add flight Now.Try again later."
        return res.status(500).json({ error: errormessage })
    }
}

const bookFlight = async (req, res) => {
    const username = req.user.username
    const { flightNo } = req.body

    try {
        if (username) {
            const flight = await Flight.findOne({ flightNo })
            if (flight) {
                const user = await User.findOne({username})

                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }

                if (user.flights.includes(flight._id)) {
                    return res.status(400).json({ error: 'You have already booked this flight' });
                }

                user.flights.push(flight._id);
                await user.save();

                flight.totalSeats -= 1;
                await flight.save()

                return res.status(200).send({ message: `Booking Successful!` })
            }
            else {
                return res.status(400).send({ error: `No flight exist with no - ${flightNo}` })
            }
        }
        else {
            return res.status(400).send({ error: "Not Authorized!" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error : "Please try again later."})
    }
}

module.exports = { addFlight, bookFlight }