
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

module.exports = { adminLogin };
