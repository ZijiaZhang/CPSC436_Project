import React from "react";
import PostBlock, {Post} from './PostBlock';
import {connect} from "react-redux";

interface IPostsLayoutProps {
  postList: Post[];
}

class PostsLayout extends React.Component<IPostsLayoutProps, {}> {
  constructor(props: IPostsLayoutProps) {
    super(props);
  }

  render() {
    const postList: Post[] = this.props.postList.slice().reverse();
    const listPosts = postList.map((post) =>
      <PostBlock post={post} />
    );
    return (
      <div id="all-posts">
        {listPosts}
      </div>
    );
  }
}

const mapStateToProps = (state: { postList: Post[]; }) => { //name is by convention
  return { postList: state.postList }; //now it will appear as props
};

export default connect(mapStateToProps)(PostsLayout);
