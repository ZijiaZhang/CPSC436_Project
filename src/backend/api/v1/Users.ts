import express from 'express';
import {User} from "../../Models";
export const usersRouter = express.Router();
import passport from 'passport'


usersRouter.get('/', (req, res) => {
    res.json({ user : req.user });
});

usersRouter.get('/register', (req, res) => {
    res.send("register!!!");
});

usersRouter.post('/register', (req, res, next) => {
    User.register(new User({ username : req.body.username }), req.body.password, (err: any) => {
        if (err) {
          return res.json({ error : err.message });
        }

        passport.authenticate('local')(req, res, () => {
            if (req.session) {
                req.session.save((err: any) => {
                    if (err) {
                        return next(err);
                    }
                    res.redirect('/login');
                });
            }
        });
    });
});


usersRouter.get('/login', (req, res) => {
    res.send({ user : req.user, error : req.flash('error')});
});

usersRouter.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req, res, next) => {
    if (req.session) {
        req.session.save((err: any) => {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    }
});
