import express from "express";
import {Tag} from "../../models/TagModel";
import { ITag } from "../../../shared/ModelInterfaces";

export const tagsRouter = express.Router();

tagsRouter.get('/', (req, res) => {
    const query = Tag.find({});
    query.exec()
        .then((tags: ITag[]) => res.json(tags))
        .catch(() => res.status(500).json({message: `Failed to get all tags.`}))
});

tagsRouter.post('/', (req, res) => {
    const newTag: ITag = req.body;

    Tag.create(newTag)
        .then((tag: ITag) => res.json(tag))
        .catch(() => res.status(500).json({message: `Failed to create new tag ${newTag.name}.`}))
});
