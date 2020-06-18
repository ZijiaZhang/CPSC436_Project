import React from "react";
import {Comment} from "./PostBlock";

export interface CommentBlockProps {
    comment: Comment
}
export interface CommentBlockState {

}

class CommentBlock extends React.Component<CommentBlockProps, CommentBlockState> {
    constructor(props: CommentBlockProps) {
        super(props);
        this.state = {
        };
    };

    render() {
        return (
            <div className="comment-block">
                <div className="comment-profile-photo-block">
                    <img src={this.props.comment.avatar} alt="ProfilePhoto" className="comment-profile-photo"/>
                </div>
                <div className="comment-detail-block">
                    <p className="comment-user-name">{this.props.comment.name}:</p>
                    <p className="comment-time">{this.props.comment.time}</p>
                    <div className="comment-detail">
                        {this.props.comment.detail}
                    </div>
                </div>
            </div>
        );
    }
}
export default CommentBlock;