import React from "react";
import CommentBlock from "./CommentBlock";

interface ICommentsContainerProps {
    comments: any[]
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
        const listComments = comments.map((comment, index) =>
            <CommentBlock comment={comment} key={'commentNo' + index} />
        );
        return (
            <div className="all-comments-of-the-post">
                {listComments}
            </div>
        );
    }
}

export default CommentsContainer;
