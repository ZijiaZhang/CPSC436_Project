import React from "react";
import CommentBlock from "./CommentBlock";
import {Comment} from "./PostBlock";

interface ICommentsContainerProps {
    comments: Comment[]
}

interface ICommentsContainerState {

}

class CommentsContainer extends React.Component<ICommentsContainerProps, ICommentsContainerState>{

    constructor(props: ICommentsContainerProps) {
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