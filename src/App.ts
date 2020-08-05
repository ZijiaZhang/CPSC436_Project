import express from 'express';
import path from 'path';
import {apiRouter} from "./backend/api";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
const mongoose = require('mongoose');
let  expressSession = require('express-session');
// import passport and flash here
import passport from 'passport';
import {BasicStrategy} from "passport-http";
import {User} from "./backend/models/UserModel";
import {SocketStore} from "./backend/SocketStore";
import {managementMiddleware} from "./backend/shared/Middlewares";
import {Socket} from "socket.io";
const LocalStrategy = require('passport-local').Strategy;
const flash = require("connect-flash");

let sessionMiddleWare = expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new (require("connect-mongo")(expressSession))({
        url: "mongodb://localhost:27017/project"
    })
});

export const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(sessionMiddleWare);

// passport initialize and session
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());
// import User from model and apply passport library functions
passport.use(new LocalStrategy(User.authenticate()));
passport.use(new BasicStrategy(
    function(userid: string, password: string, done: any) {
        User.findOne({ username: userid }, function (err: any, user: any) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.authenticate(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const port = process.env.PORT || 3000;
const mongoConnectionString = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/project';


// add these to prevent warnings
mongoose.connect(mongoConnectionString, {useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log(`mongoose connected to ${mongoConnectionString} !`);
});

app.use(managementMiddleware);


app.use('/api', apiRouter);


app.get(/^\/(login|register)/, (req,res) =>{
        let flash = req.flash();
        if (Object.keys(flash).length !== 0){
            return res.redirect(req.path + `?err=${flash.error}`)
        }
        res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get(/^\/(settings|chatRoom|searchPage|chats)?$/, (req,res) =>{
    
    if(req.user)
        {
            res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
        }
    else
        {
            res.redirect('/login');
        }
});

app.get('/status', (req,res) =>{
        res.sendFile(path.join(__dirname, '..', 'public', 'status.html'));
});
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(function (req, res)  {
    res.status(404).json({message: 'Requested file not find'})
});
console.log(path.join(__dirname, 'public'));
let server = app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

export function stop(){
    server.close()
}

var io = require('socket.io')(server);

io.use(function(socket:any, next:any){
    sessionMiddleWare(socket.request, {}, next);
});

io.on("connection", function(socket:Socket){
    console.log(socket.id + ' connected');
    try {
        var userId = socket.request.session.passport.user;
    } catch (e) {
        socket.disconnect(true);
        return
    }
    SocketStore.allSockets[userId] = socket;
    socket.on('disconnect', function (reason: any) {
        console.log(socket.id + ' disconnected ' + reason);
    })
});


