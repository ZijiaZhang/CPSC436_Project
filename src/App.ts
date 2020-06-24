import express from 'express';
import path from 'path';
import {apiRouter} from "./backend/api";
import bodyParser from 'body-parser';
const mongoose = require('mongoose');

export const app = express();

const port = process.env.PORT || 3000;
const mongoConnectionString = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/project';

app.use(bodyParser.json());

// mongoose connection, connect to local database with db name "project", creates new database if "project" doesn't exist
mongoose.connect(mongoConnectionString, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log(`mongoose connected to ${mongoConnectionString} !`);
});

app.use('/api', apiRouter);
app.use(express.static(path.join(__dirname, '..', 'public')));

console.log(path.join(__dirname, 'public'));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
