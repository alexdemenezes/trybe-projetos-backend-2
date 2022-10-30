const express = require('express');
const cors = require('cors');
const handleError = require('./middleware/handleError');
const usersRouter = require('./routes/userRouter');
const productsRouter = require('./routes/productsRouter');
const salesRouter = require('./routes/salesRouter');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api', usersRouter);

app.use('/api/products', productsRouter);
app.use('/api/sales', salesRouter);

app.use(handleError);

module.exports = app;
