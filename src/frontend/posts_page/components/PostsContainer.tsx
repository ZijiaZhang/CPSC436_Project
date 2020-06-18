import React from "react";
import PostBlock, {IPost} from './PostBlock';
import {connect} from "react-redux";

interface IPostsContainerProps {
  postList: IPost[];
}

class PostsLayout extends React.Component<IPostsContainerProps, {}> {
  constructor(props: IPostsContainerProps) {
    super(props);
  }

  render() {
    const postList: IPost[] = this.props.postList.slice().reverse();
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

const mapStateToProps = (state: { postList: IPost[]; }) => { //name is by convention
  return { postList: state.postList }; //now it will appear as props
};

export default connect(mapStateToProps)(PostsLayout);

