import express from 'express';
import path from 'path';
import {apiRouter} from "./backend/api";
import bodyParser from 'body-parser';
const mongoose = require('mongoose');
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;
const flash = require("connect-flash");


export const app = express();

const User = require('./backend/Models').User;
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const port = process.env.PORT || 3000;
const mongoConnectionString = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/project';

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());

mongoose.connect(mongoConnectionString, {useNewUrlParser: true,  useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log(`mongoose connected to ${mongoConnectionString} !`);
});

console.log(apiRouter);
app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, '..', 'public')));
app.get(/^\/(settings|chatRoom|searchPage)?$/, (req,res) =>{
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
app.use(function (req, res)  {
    res.status(404).json({message: 'Requested file not find'})
});
console.log(path.join(__dirname, 'public'));
let server = app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

export function stop(){
    server.close()
}

