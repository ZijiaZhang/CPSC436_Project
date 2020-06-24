import express from 'express';
import {User} from "../../Models";
export const usersRouter = express.Router();

// Get all users
usersRouter.get('/', (req, res) => {
    // TODO
    res.send('GET all users');
});

// Get one user with username
usersRouter.get('/:username', (req, res) => {
    const username = req.params.username;

    // findOne does not throw error if user is not found
    User.findOne({ username }, (err: Error, user: any) => {
        if (err) {
            console.log(`\n\n Trying to get user with username ${username} but got ${err} \n`);
            res.status(500).json({error: `Cannot get user with username ${username}`});
        }

        if (!user) {
            res.status(400).json({error: `User with username ${username} does not exist`});
        }

        res.send(user);
    })
});

// TODO: consider changing the uri for this to /register
// Post new user
usersRouter.post('/', (req, res) => {
    User.create(req.body, (err: Error, user: any) => {

        if (err) {
            console.log(`\n\n Trying to add new user with username ${req.body.username} but got ${err} \n`);

            if (err.name === 'ValidationError') {
                res.status(400).json({error: `Failed to add user with username ${req.body.username} because it failed validation`});
            } else {
                res.status(500).json({error: `Failed to add user with username ${req.body.username}`});
            }
        }

        res.send(user);
    });
});