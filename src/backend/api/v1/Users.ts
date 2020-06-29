import express from 'express';
import {User} from "../../Models";
export const usersRouter = express.Router();
import passport from 'passport'


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

// TODO: Get all users
usersRouter.get('/', (req, res) => {
    User.find({}).then(function(users: any) {
        res.send(users);
    })
    console.log("GET ALL USERS")
});

// Get one user with username
usersRouter.get('/:username', (req, res) => {
    const username = req.params.username;

    // findOne does not throw error if user is not found
    User.findOne({ username }, (err: Error, user: any) => {
        if (err) {
            console.log(`\n\n Trying to get user with username ${username} but got ${err} \n`);
            res.status(500).json({error: `Cannot get user with username ${username}`});
            return;
        }

        if (!user) {
            res.status(400).json({error: `User with username ${username} does not exist`});
            return;
        }

        res.send(user);
    })
});

// TODO: consider changing the uri for this to /register
// Post new user
usersRouter.post('/register', (req, res, next) => {
    console.log(req);
    User.register(new User({ username : req.body.username }), req.body.password, (err: any, user: any) => {
                console.log(err, user);
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
