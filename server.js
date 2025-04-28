const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cookieParser = require('cookie-parser');
const HttpError = require('./src/errors/HttpError');
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(async (err, req, res, next) => {
    if (err instanceof HttpError) 
        res.status(err.status).json({ message: err.message });
    else
        res.status(500).json({ message: err.message });
})

app.listen(3000, () => console.log('Server is running on port 3000\n\nLink: http://localhost:3000'));