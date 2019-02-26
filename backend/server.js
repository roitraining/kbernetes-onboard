'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const happeningController = require('./controllers/happeningController');

const app = express();
app.enable('trust proxy');


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/happening/like/:id',  happeningController.likeHappening);

app.post('/happenings/add/:id',  happeningController.addHappening);

app.get('/happenings', happeningController.getHappenings);

app.get('/', happeningController.root);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
});


const PORT = 8081;
const server = app.listen(PORT, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`HipLocal app listening at http://${host}:${port}`);
});