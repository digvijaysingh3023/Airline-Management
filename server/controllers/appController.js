const User = require('../model/User.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config()

const register = async (req, res) => {
    const { username, email, password,firstName,lastName,address,mobile } = req.body;
    console.log(req.body);

    try {
        // Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Check if username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const newUser = new User({ username, email, password: hashedPassword,firstName,lastName,mobile,address });
        await newUser.save();

        res.status(201).json({ status:'ok', message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credential' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id,username : user.username }, process.env.JWT_SECRET, { expiresIn: '12h' });

        res.status(200).json({status: 'ok',user:token});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};


async function getUser(req, res) {
    res.json('getUser route')
}

async function updateUser(req, res) {
    res.json('updateUser route')
}



module.exports = { login, register  }