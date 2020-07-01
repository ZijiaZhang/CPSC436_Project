import express from 'express';
import {User} from "../../Models";
export const usersRouter = express.Router();
import passport from 'passport'

usersRouter.get('/', (req, res) => {
    res.send( req.user);
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

// Post new user
usersRouter.post('/register', (req, res) => {
    if (req.body.password !== req.body.pwdConfirm) {
        return res.redirect(req.path + `?err=Password and confirm password do not match`);
    }
    User.register(new User({ username : req.body.username }), req.body.password, (err: any, user: any) => {
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
        req.session.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/login');
        });
    } 
});
