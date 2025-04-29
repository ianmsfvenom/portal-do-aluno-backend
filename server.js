const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cookieParser = require('cookie-parser');
const HttpError = require('./src/errors/HttpError');
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(async (err, req, res, next) => {
    if (err instanceof HttpError) res.status(err.status).json({ message: err.message });
    else res.status(500).json({ message: err.message });
})

app.use('/login', require('./src/routes/login.route'));
app.use('/modulo', require('./src/routes/modulo.route'));
app.use('/video', require('./src/routes/video.route'));
app.use('/parceria', require('./src/routes/parceria.route'));
app.use('/curso', require('./src/routes/curso.route'));
app.use('/plano', require('./src/routes/plano.route'));
app.use('/turma', require('./src/routes/turma.route'));
app.use('/apostila', require('./src/routes/apostila.route'));
app.use('/avaliacao', require('./src/routes/avaliacao.route'));

app.listen(3000, () => console.log('Server is running on port 3000\n\nLink: http://localhost:3000'));