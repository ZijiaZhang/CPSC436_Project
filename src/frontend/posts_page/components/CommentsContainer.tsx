import React from "react";
import CommentBlock from "./CommentBlock";
import {Comment} from "./PostBlock";

export interface CommentsContainerProps {
    comments: Comment[]
}

export interface CommentsContainerState {

}

class CommentsContainer extends React.Component<CommentsContainerProps, CommentsContainerState>{

    constructor(props: CommentsContainerProps) {
        super(props);
        this.state = {
        };
    };

    render() {
        const comments = this.props.comments;
        const listComments = comments.map((comment) =>
            <CommentBlock comment={comment} />
        );
        return (
            <div className="all-comments-of-the-post">
                {listComments}
            </div>
        );
    }
}

export default CommentsContainer;
