import Textarea from "./Textarea";
import PostsLayout from './PostsLayout';
import React from "react";
import reducers from '../reducers';
import {createStore} from "redux";
import {Provider} from "react-redux";
const PostPage = () => {   //this is how you make a functional component
    return (
        <div id="post-blog-page">
            <Provider store={createStore(reducers)}>
                <Textarea />
                <PostsLayout />
            </Provider>
        </div>
    );
};

export default PostPage;
