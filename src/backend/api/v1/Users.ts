import express from 'express';
export const usersRouter = express.Router();
import passport from 'passport'
import * as fs from "fs";
import {IUser, User} from "../../models/UserModel";
const multer = require('multer');

usersRouter.get('/', (req, res) => {
    res.send(req.user);
});


usersRouter.get('/all', (req, res) => {
    const userList = User.find({});
    userList.exec()
        .then((users: IUser[]) => res.send(users));
});

usersRouter.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req, res, next) => {
    if (req.session) {
        req.session.save((err: any) => {
            if (err) {
                return res.redirect(req.path + `?err=${err.message}`);
            }
            console.log('Login Success');
            res.redirect('/');
        });
    }
});

// Post new user
usersRouter.post('/register', (req, res) => {
    if (req.body.password !== req.body.pwdConfirm) {
        return res.redirect(req.path + `?err=Password and confirm password do not match`);
    }
    if (!req.body.fullname) {
        return res.redirect(req.path + `?err=No fullname was given`);
    }
    User.register(new User({
        username: req.body.username,
        fullname: req.body.fullname
    }), req.body.password, (err: any, user: any) => {
        if (err) {
            return res.redirect(req.path + `?err=${err.message}`);
        }
        passport.authenticate('local')(req, res, () => {
            if (req.session) {
                req.session.save((err: any) => {
                    res.redirect('/login');
                });
            }
        });
    });
});


usersRouter.get('/logout', (req, res, next) => {
    req.logout();
    if (req.session) {
        req.session.save(() => {
            res.redirect('/login');
        });
    }
});


usersRouter.get('/:username',  (req, res, next)=> {
    if(!req.isAuthenticated()){
        passport.authenticate('basic', { session: false })(req, res, next)
    } else {
        next();
    }
}, (req, res) => {
    if (req.user) {
        User.findOne({username: req.params.username}).exec().then(
            (user: any) => {
                res.json(user);
            }
        ).catch(() => {
            res.status(500).json({'message': 'error'});
        });
    } else {
        res.status(401).json({'message': 'Not Authorized'});
    }
});

// update user with username
usersRouter.patch('/:username', (req, res, next) => {
    const {username} = req.params;
    const newProperties = req.body;
    const query = User.findOneAndUpdate({username: username}, newProperties, {new: true});
    query.exec()
        .then((user: IUser | null) => {
            if (user === null) {
                res.status(400).json({message: `Cannot find user with username ${username}`});
            } else{
                res.json(user);
            }
        })
        .catch(() => {
            res.status(500).json({message: `Failed to update user with username ${username}`});
        })
});

const storage = multer.diskStorage({
    destination: './public/images',
    filename(req: any, file: any, cb: any) {
        cb(null, `${file.originalname}`);
    },
});

const upload = multer({ storage });

usersRouter.post('/uploadAvatar', upload.single('file'), (req, res, next) => {
    res.send("./images/" + req.file.filename);
});

usersRouter.delete('/deleteAvatar', (req, res, next) => {
    fs.unlink('./public' + req.body.oldPath.substring(1, req.body.oldPath.length), (err) => {
        res.send('Deleted')
    });
});