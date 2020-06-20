import PostsContainer from './PostsContainer';
import React from "react";
import reducers from '../reducers';
import {createStore} from "redux";
import {Provider} from "react-redux";
import InputBlock from "./InputBlock";
const PostPage = () => {
    return (
    <div id="post-blog-page">
        <Provider store={createStore(reducers)}>
            <InputBlock />
            <PostsContainer />
        </Provider>
    </div>
  );
};

export default PostPage;
