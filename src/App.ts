import express from 'express';
import path from 'path';
import {apiRouter} from "./backend/api";
import bodyParser from 'body-parser';
const mongoose = require('mongoose');

// import passport and flash here
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;
const flash = require("connect-flash");


export const app = express();

// import User from model and apply passport library functions
const User = require('./backend/Models').User;
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const port = process.env.PORT || 3000;
const mongoConnectionString = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/project';

app.use(bodyParser.json());

// passport initialize and session
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());

// add these to prevent warnings
mongoose.connect(mongoConnectionString, {useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log(`mongoose connected to ${mongoConnectionString} !`);
});

app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, '..', 'public')));
app.get(/^\/(settings|chatRoom|searchPage|login|register)?$/, (req,res) =>{
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

