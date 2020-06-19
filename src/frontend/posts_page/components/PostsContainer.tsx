import React from "react";
import PostBlock, {IPost} from './PostBlock';


interface IPostsContainerProps {
  posts: IPost[];
}

class PostsContainer extends React.Component<IPostsContainerProps, {}> {

  render() {
    const listPosts = this.props.posts.map((post) =>
      <PostBlock post={post} />
    );
    return (
      <div id="all-posts">
        {listPosts}
      </div>
    );
  }

}

export default PostsContainer;
