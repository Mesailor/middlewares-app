const express = require('express');
const app = express();
const mongoose = require('mongoose');
const usersRouter = require('./routers/users');

app.use(express.json());
app.use('/api/users', usersRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

mongoose.connect('mongodb://localhost:8088/middlewares')
    .then(() => {
        console.log('Connected to DB...');
    })
    .catch((error) => {
        console.log(error);
    });

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});