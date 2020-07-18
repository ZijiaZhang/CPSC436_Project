import React from "react";

interface ICommentBlockProps {
    comment: any
}
interface ICommentBlockState {

}

class CommentBlock extends React.Component<ICommentBlockProps, ICommentBlockState> {
    constructor(props: ICommentBlockProps) {
        super(props);
        this.state = {
        };
    };

    render() {
        return (
            <div className="comment-block">
                <div className="comment-profile-photo-block">
                    <img src={this.props.comment.avatarPath} alt="ProfilePhoto" className="comment-profile-photo"/>
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
