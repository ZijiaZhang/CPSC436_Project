import express from "express";
import {Group} from "../../models/GroupModel";
import {User} from "../../models/UserModel";
import {IUser, IGroup} from "../../../shared/ModelInterfaces";
import passport from "passport";

export const groupsRouter = express.Router();

groupsRouter.use((req, res, next)=> {
    if(!req.isAuthenticated()){
        passport.authenticate('basic', { session: false })(req, res, next)
    } else {
        next();
    }
}, );

// Get a group by group id
groupsRouter.get('/:groupID', function (req, res, next) {
    Group.findById(req.params.groupID).then(
        (data: IGroup| null) => {
            if (!data){
                return res.status(404).json({message: "The group ID not found"})
            }
            res.json(data)
        }
    ).catch(
        () => res.status(404).json({message: "The group ID not found"})
    )
});

// Create a new group with "name" and add current user into the group
groupsRouter.put('/:name', function (req, res, next) {
    const user = req.user as IUser;
    Group.create({name: req.params.name, users:[user.username]} as IGroup).then(
        (data: IGroup) => {
            User.findOneAndUpdate({username: user.username}, {$push: {groups: data._id}}).then(
                () => res.json(data)
            ).catch(
                () => res.status(500).json({message: 'error when adding group to user'})
            )
        }
    ).catch(
        (err) => res.status(500).json({message: 'error when creating the entry', err: err})
    )
});

// Add a user into an existing group that the current user is in
groupsRouter.post('/', async function (req, res, next) {
    const user = req.user as IUser;
    const groupID = req.body.groupID;
    const username = req.body.username;
    if (!user.groups.includes(groupID)){
        return res.status(401).json({message: 'Not Authorized'})
    }

    let group = await Group.findById(groupID).exec();
    if (group!.users.includes(username)){
        return res.status(409).json({message: 'User is Already in the group'})
    }

    Group.findByIdAndUpdate(groupID, {$push: {users: username}},{new: true}).then(
        (data: IGroup| null) => {
            if (!data){
                return res.status(404).json({message: 'Group ID not found'})
            }
            User.findOneAndUpdate({username}, {$push: {groups: groupID}}).then(
                () => res.json(data)
            ).catch(
                () => res.status(500).json({message: 'error when adding group to user'})
            )
        }
    ).catch(
        (err) => res.status(500).json({message: 'error when creating the entry', err: err})
    )
});
