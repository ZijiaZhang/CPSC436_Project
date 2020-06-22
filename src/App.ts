import express from 'express';
import path from 'path';
import {apiRouter} from "./backend/api";
import {User} from "./backend/Models";
import bodyParser from 'body-parser';
const mongoose = require('mongoose');

export const app = express();
const port = 3000;
app.use(bodyParser.json());

// mongoose connection, connect to local database with db name "project", creates new database if "project" doesn't exist
mongoose.connect('mongodb://localhost:27017/project', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('mongoose connected!');
});

app.use('/api', apiRouter);
app.use(express.static(path.join(__dirname, '..', 'public')));

// TODO: will move to a different file after rebasing with backend apiRouter setup PR
// Sample apis for User Schema:
app.post('/user', (req, res) => {
    User.create(req.body, (err: Error, user: any) => {
        console.log(err, user);
        res.send(user);
    });
});

app.get('/user/:username', (req, res) => {
    const username = req.params.username;
    User.findOne({ username }, (err: Error, user: any) => {
        res.send(user);
    })
});

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

console.log(path.join(__dirname, 'public'));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
