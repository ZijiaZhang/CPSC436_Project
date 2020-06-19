import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import {connect} from "react-redux";
import {addLike, undoLike} from "../actions";
import CommentsContainer from "./CommentsContainer";
import CommentInputBar from "./CommentInputBar";

export interface PostBlockProps {
  post: Post,
  addLike: any,
  undoLike: any
}

export interface Post {
  id: string,
  time: string,
  name: string,
  detail: string,
  avatar: string,
  image: string,
  numLikes: number,
  comments: Comment[],
  type: string,
  visibility: string,
  tags: string[],
  liked: boolean
}

export interface Comment {
  time: string,
  name: string,
  detail: string,
  avatar: string,
  image: string,
  visibility: string,
}

interface PostBlockState {
    showComments: boolean,
    postHidden: boolean
}


class PostBlock extends React.Component<PostBlockProps, PostBlockState> {
  constructor(props: PostBlockProps) {
    super(props);
    this.state = {
        showComments: false,
        postHidden: false
    };
  }

  markLike = (post: Post) => {
    if(post.liked) {
      this.props.undoLike(post.id);
    } else {
      this.props.addLike(post.id);
    }
  };

  hidePost = () => {
      this.setState({postHidden: !this.state.postHidden});
  };

  displayComment = () => {
      this.setState({showComments: !this.state.showComments});
  };

  render() {
    const dropDownStyle = {
      color: 'darkgray',
      background: 'white',
      borderColor: 'white'
    };
    return(<div className="post-block" key={this.props.post.id}>
        <div className="hidden-post">

        </div>
      <div className="profile-photo-block">
        <img src={this.props.post.avatar} alt="ProfilePhoto" className="post-profile-photo"/>
      </div>
      <div className="post-detail-block">
        <p className="post-user-name">{this.props.post.name}</p>
        <p className="post-time">{this.props.post.time}</p>
        <div className="post-drop-down-block">
          <Dropdown>
            <Dropdown.Toggle className="post-drop-down-menu" style={dropDownStyle} variant="success" id="dropdown-basic">
              v
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item className="post-drop-down-button">Save Post</Dropdown.Item>
              <Dropdown.Item className="post-drop-down-button">Hide Post</Dropdown.Item>
              <Dropdown.Item className="post-drop-down-button">Report Post</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="post-detail">
          {this.props.post.detail}
        </div>
        <div className="images">
          {this.props.post.image ? <img className="inserted-image" src={this.props.post.image} alt={''}/>: ''}
        </div>
        <div className="interaction-buttons">
          <button className="like-button" onClick={() => this.markLike(this.props.post)}>Like {this.props.post.numLikes}</button>
          <button className="comment-button" onClick={this.displayComment}>Comment {this.props.post.comments.length}</button>
          <button className="share-button">Share</button>
        </div>
        <div style={this.state.showComments ? {display: 'block'} : {display: 'none'}}>
          <CommentsContainer comments={this.props.post.comments}/>
        </div>
        <CommentInputBar post={this.props.post} />
      </div>
    </div>)
  }
}

const mapStateToProps = (state: { postList: any}) => {
    return {postList: state.postList};
};

export default connect(mapStateToProps, {addLike, undoLike})(PostBlock);
