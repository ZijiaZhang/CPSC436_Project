import express from 'express';
import path from 'path';
import {apiRouter} from "./backend/api";
import bodyParser from 'body-parser';
const mongoose = require('mongoose');

export const app = express();

const port = process.env.PORT || 3000;
const mongoConnectionString = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/project';

app.use(bodyParser.json());

mongoose.connect(mongoConnectionString, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log(`mongoose connected to ${mongoConnectionString} !`);
});

app.use('/api', apiRouter);
app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

console.log(path.join(__dirname, 'public'));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
