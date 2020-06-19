import React from "react";
import {IUserProps} from "../../shared/interfaces/IUserProps";

export interface IPostBlockProps {
  post: IPost
}

export interface IPost extends IUserProps {
  time: string,
  detail: string,
  image: string
}

interface IPostBlockState {
  like: number,
  liked: boolean
}

class PostBlock extends React.Component<IPostBlockProps, IPostBlockState> {
  constructor(props: IPostBlockProps) {
    super(props);
    this.state = {
      like: 0,
      liked: false
    };
  }

  markLike = () => {
    if(this.state.liked) {
      this.setState({like: this.state.like - 1});
    } else {
      this.setState({like: this.state.like + 1});
    }
    this.setState({liked: !this.state.liked});
  };


  render() {
    return(<div className="post-block">
      <div className="profile-photo-block">
        <img src={this.props.post.avatarPath} alt="ProfilePhoto" className="post-profile-photo"/>
      </div>
      <div className="post-detail-block">
        <p className="post-user-name">{this.props.post.name}</p>
        <p className="post-time">{this.props.post.time}</p>
        <div className="post-detail">
          {this.props.post.detail}
        </div>
        <div className="images">
          {this.props.post.image ? <img className="inserted-image" src={this.props.post.image} alt={''}/>: ''}
        </div>
        <div className="interaction-buttons">
          <button className="like-button" onClick={this.markLike}>Like {this.state.like}</button>
          <button className="comment-button">Comment</button>
        </div>
      </div>
    </div>)
  }
}

export default PostBlock;
