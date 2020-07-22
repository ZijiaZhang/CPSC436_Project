import React from "react";
import {IUserProps} from "../../shared/interfaces/IUserProps";
import Dropdown from "react-bootstrap/Dropdown";
import {connect} from "react-redux";
import {updateLike, deletePost, loadSavedPosts, loadHiddenPosts} from "../actions";
import CommentsContainer from "./CommentsContainer";
import CommentInputBar from "./CommentInputBar";
import {IUser} from "../../../shared/ModelInterfaces";
import {loadUserInfo} from "../../settings/actions";
import {getPostsByIds, updateUserInfo} from "../../shared/globleFunctions";

export interface IPostBlockProps {
    post: any,
    updateLike: any,
    userInfo: IUser,
    deletePost: any,
    loadUserInfo: any,
    loadSavedPosts: any,
    loadHiddenPosts: any
}

export interface IPost extends IUserProps{
  id: string,
  time: string,
  name: string,
  detail: string,
  avatarPath: string,
  image: string,
  numLikes: number,
  comments: any[],
  type: string,
  visibility: string,
  tags: string[],
  liked: boolean,
  hidden: boolean
}

interface IPostBlockState {
    showComments: boolean,
    postHidden: boolean
}

class PostBlock extends React.Component<IPostBlockProps, IPostBlockState> {
  constructor(props: IPostBlockProps) {
    super(props);
    this.state = {
        showComments: false,
        postHidden: false
    };
  }

  markLike = async () => {
      let update = {
          likedUserIds: []
      };
      const likes = this.props.post.likedUserIds.slice();
      if(likes.includes(this.props.userInfo._id)) {
          likes.splice(likes.indexOf(this.props.userInfo._id), 1);
      } else {
          likes.push(this.props.userInfo._id);
      }
      update.likedUserIds = likes;
      let response = await fetch('/api/v1/posts/' + this.props.post.id, {method: 'PATCH',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(update)
          });
      let responseData = await response.json();
      this.props.updateLike(responseData.likedUserIds, responseData._id);
  };

  savePost = async () => {
      let update = {
          savedPostIds: this.props.userInfo.savedPostIds.slice()
      };
      if (this.props.userInfo.savedPostIds.includes(this.props.post.id)) {
          update.savedPostIds.splice(update.savedPostIds.indexOf(this.props.post.id), 1);
      } else {
          update.savedPostIds.push(this.props.post.id);
      }
      let responseData = await updateUserInfo(this.props.userInfo.username, update);
      this.props.loadUserInfo(responseData);
      this.props.loadSavedPosts(await getPostsByIds(responseData.savedPostIds))
  };

  hidePost = async () => {
      let update = {
          hiddenPostIds: this.props.userInfo.hiddenPostIds.slice()
      };
      if (this.props.userInfo.hiddenPostIds.includes(this.props.post.id)) {
          update.hiddenPostIds.splice(update.hiddenPostIds.indexOf(this.props.post.id), 1);
      } else {
          update.hiddenPostIds.push(this.props.post.id);
      }
      let responseData = await updateUserInfo(this.props.userInfo.username, update);
      this.props.loadUserInfo(responseData);
      this.props.loadHiddenPosts(await getPostsByIds(responseData.hiddenPostIds));
      this.setState({postHidden: !this.state.postHidden});
  };

  displayComment = () => {
      this.setState({showComments: !this.state.showComments});
  };

  deletePost = async () => {
      try{
          await fetch('/api/v1/posts/' + this.props.post.id, {method: 'DELETE'});
          this.props.deletePost(this.props.post.id);
      } catch (e) {
          console.log(e);
      }
  };

  render() {
    const dropDownStyle = {
      color: 'darkgray',
      background: 'white',
      borderColor: 'white'
    };
    const deleteButton = this.props.post.userId === this.props.userInfo._id ?
        <Dropdown.Item className="profile-drop-down-button" onClick={this.deletePost}>
            <span className={'glyphicon glyphicon-remove'} /> Delete Post</Dropdown.Item> : "";
    return(<div className="post-block" key={this.props.post.id}>
        <div className="hidden-post" style={this.props.post.hidden ? {display: 'block'} : {display: 'none'}}>
            <span className="hidden-post-title">Post hidden</span>
            <button className="undo-hide-post" onClick={this.hidePost}>Undo</button>
        </div>
        <div style={this.props.post.hidden ? {display: 'none'} : {display: 'block'}}>
            <div className="profile-photo-block">
                <img src={this.props.post.avatarPath} alt="ProfilePhoto" className="post-profile-photo"/>
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
                            <Dropdown.Item className="profile-drop-down-button" onClick={this.savePost}>
                                <span className={'fa fa-bookmark-o'} /> Save Post</Dropdown.Item>
                            <Dropdown.Item className="profile-drop-down-button" onClick={this.hidePost}>
                                <span className={'fa fa-times-rectangle-o'} /> Hide Post</Dropdown.Item>
                            <Dropdown.Item className="profile-drop-down-button">
                                <span className={'fa fa-exclamation-triangle'} /> Report Post</Dropdown.Item>
                            {deleteButton}
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
                    <button className="like-button" onClick={this.markLike}>
                        <span className={'fa fa-thumbs-o-up'} /> Like {this.props.post.likedUserIds.length}</button>
                    <button className="comment-button" onClick={this.displayComment}>
                        <span className={'fa fa-commenting-o'} /> Comment {this.props.post.comments.length}</button>
                    <button className="share-button">
                        <span className={'fa fa-share-square-o'} /> Share</button>
                </div>
                <div style={this.state.showComments ? {display: 'block'} : {display: 'none'}}>
                    <CommentsContainer comments={this.props.post.comments}/>
                </div>
                <CommentInputBar post={this.props.post} user={this.props.userInfo} />
            </div>
        </div>
    </div>)
  }
}

const mapStateToProps = (state: { postList: any, userInfo: any}) => {
    return {
        postList: state.postList,
        userInfo: state.userInfo
    };
};

export default connect(mapStateToProps, {updateLike, deletePost, loadUserInfo, loadSavedPosts, loadHiddenPosts})(PostBlock);
