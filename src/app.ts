import express from 'express';
const rateLimit = require('express-rate-limit');
const cors = require('cors')
import router from './routes/userRoutes';

const app = express();
const port = 3000;

// Initialize Rate Limit
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10,
});
app.use(limiter);

// Enable JSON requests & responses
app.use(express.json());

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Define Routers
app.use("/user", router);

// Open to port
app.listen(port, () => {
    console.log('Opened server on port ', port);
})