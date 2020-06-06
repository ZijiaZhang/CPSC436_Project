import React from "react";
import PostBlock, {Post} from './PostBlock';


interface PostsLayoutProps {
  posts: Post[];
}

class PostsLayout extends React.Component<PostsLayoutProps, {}> {

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

export default PostsLayout;
