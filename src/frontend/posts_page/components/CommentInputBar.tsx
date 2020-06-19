import React from "react";
import {connect} from "react-redux";
import {addComment, addLike, undoLike} from "../actions";
import {IPost} from "./PostBlock";

interface ICommentInputBarProps{
    addComment: any,
    post: IPost
}
interface ICommentInputBarState{
    comment: string,
    checked: boolean,
    editing: boolean
}

class CommentInputBar extends React.Component<ICommentInputBarProps, ICommentInputBarState> {
    constructor(props: ICommentInputBarProps) {
        super(props);
        this.state = {
            comment: '',
            checked: false,
            editing: false
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

    postComment = (post: IPost) => {
        if(this.state.comment.trim() !== '') {
            let d = new Date();
            let time = d.getHours() + ':' + d.getMinutes();
            let date = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
            const newComment = {time: date + ' ' + time, name:'N/A', detail: this.state.comment,
                avatar: './images/nobu!.png', image: '', visibility: this.state.checked ? 'private' : 'public'};
            this.props.addComment({index: post.id, detail: newComment});
            this.setState({editing: false});
            this.setState({comment: ''});
        }
    };

    render() {
        return (<div className="comment-input-block" style={this.state.editing ? {height: '120px'} : {height: '80px'}}>
            <textarea className="comment-text-input-bar" placeholder="Leave a comment" value={this.state.comment}
                      onChange={this.inputOnChange} onClick={this.startComment}
                      style={this.state.editing ? {height: '80px'} : {height: '40px'}}/>
            <div style={this.state.editing ? {display: 'block'} : {display: 'none'}}>
                <div className="comment-block-left-side-buttons">
                    <button className="comment-modification-button">Emoji</button>
                    <button className="comment-modification-button">@</button>
                    <button className="comment-modification-button">Photo</button>
                </div>
                <div className="comment-block-right-side-buttons">
                <span className="comment-modification-button">
                    Private
                </span>
                    <input className="comment-private-checkbox" type="checkbox" checked={this.state.checked}
                           onClick={this.setPrivate}/>
                    <button className="comment-modification-button" onClick={() => this.postComment(this.props.post)}>Post</button>
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
