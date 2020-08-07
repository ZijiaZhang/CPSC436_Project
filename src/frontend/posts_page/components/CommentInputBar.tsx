import React from "react";
import {connect} from "react-redux";
import {addComment} from "../actions";
import {IUser} from "../../../shared/ModelInterfaces";
import {requestAPIJson} from "../../shared/Networks";
import EmojiBlock from "./EmojiBlock";

interface ICommentInputBarProps{
    addComment: any,
    post: any,
    user: IUser
}
interface ICommentInputBarState{
    comment: string,
    checked: boolean,
    editing: boolean,
    dropDown: boolean
}

class CommentInputBar extends React.Component<ICommentInputBarProps, ICommentInputBarState> {
    constructor(props: ICommentInputBarProps) {
        super(props);
        this.state = {
            comment: '',
            checked: false,
            editing: false,
            dropDown: false
        };
    };

    inputOnChange = (event: any) => {
        this.setState({comment: event.target.value});
    };

    setPrivate = () => {
        this.setState({checked: !this.state.checked});
    };

    startComment = () => {
        this.setState({editing: true});
    };

    cancelComment = () => {
        this.setState({editing: false});
        this.setState({comment: ''});
    };

    postComment = async () => {
        if(this.state.comment.trim() !== '') {
            let d = new Date();
            let time = d.getHours() + ':' + d.getMinutes();
            let date = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
            const newComment = {time: date + ' ' + time, userId: this.props.user._id, detail: this.state.comment,
                postId: this.props.post.id, visibility: this.state.checked ? 'private' : 'public'};
            let responseData = await requestAPIJson('/api/v1/comments/',
                'POST',
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                newComment);
            this.props.addComment(
                {
                    time: responseData.time,
                    name: this.props.user.fullname,
                    detail: responseData.detail,
                    visibility: responseData.visibility,
                    avatarPath: this.props.user.avatarPath
                },
                this.props.post.id
            );
            this.setState({editing: false});
            this.setState({comment: ''});
        }
    };

    showDropDown = () => {
        this.setState({dropDown: !this.state.dropDown});
    };

    addEmoji = (emoji: any) => {
        this.setState({comment: this.state.comment + emoji});
    };

    render() {
        return (<div className="comment-input-block" style={this.state.editing ? {height: '120px'} : {height: '80px'}}>
            <textarea className="comment-text-input-bar" placeholder="Leave a comment" value={this.state.comment}
                      onChange={this.inputOnChange} onClick={this.startComment}
                      style={this.state.editing ? {height: '80px'} : {height: '40px'}}/>
            <div style={this.state.editing ? {display: 'block'} : {display: 'none'}}>
                <div className="comment-block-left-side-buttons">
                    <button className="comment-modification-button" onClick={this.showDropDown}>😀</button>
                    <div className="profile-interaction-drop-down-buttons" style={this.state.dropDown ? {display: 'block'} : {display: 'none'}}>
                        <EmojiBlock addEmoji={this.addEmoji}/>
                    </div>
                </div>
                <div className="comment-block-right-side-buttons">
                <span className="comment-modification-button">
                    Private
                </span>
                    <input className="comment-private-checkbox" type="checkbox" readOnly checked={this.state.checked}
                           onClick={this.setPrivate}/>
                    <button className="comment-modification-button" onClick={this.postComment}>Post</button>
                    <button className="comment-modification-button" onClick={this.cancelComment}>Cancel</button>
                </div>
            </div>
        </div>);
    }
}
const mapStateToProps = (state: { postList: any}) => {
    return {postList: state.postList};
};

export default connect(mapStateToProps, {addComment})(CommentInputBar);
