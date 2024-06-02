const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./router/UserRoutes.js')
const authroutes = require('./router/UserAuthRoutes.js')
const adminRoutes = require('./router/adminRoutes.js')
const connect = require('./db/connection.js');
const dotenv = require('dotenv');
const authMiddleware = require('./middleware/authMiddleware.js')

const app = express()

dotenv.config();

/* middleware */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

const port = 8080;

app.get('/', (req, res) => {
    res.status(201).json("Home get request")
});

/* api rotes */
/** USER Auth Routes */
app.use('/api/auth', authroutes)

/** USER Routes */
app.use('/api', (req, res, next) => {
    if (req.path === '/searchFlight') {
        next(); // Skip authMiddleware for this route
    } else {
        authMiddleware(req, res, next);
    }
}, router)

/** ADMIN Routes */
app.use('/api/admin', (req, res, next) => {
    if (req.path === '/login') {
        next(); // Skip authMiddleware for this route
    } else {
        authMiddleware(req, res, next);
    }
}, adminRoutes)

/*start server only when we have valid connection */
connect(process.env.CONNECTION_STRING).then(() => {
    try {
        app.listen(port, () => {
            console.log(`server is connected to http://localhost:${port} `);
        })
    } catch (error) {
        console.log("cant connect to server");
    }
}).catch(error => {
    console.log(error);
    console.log("invalid db connection");
})
