import React from "react";
import reducers from '../reducers';
import {createStore} from "redux";
import {Provider} from "react-redux";
import HomePage from "./HomePage";

const user = {
    username: 'Denise',
    fullname: 'Denise',
    avatarPath: './images/test2.png',
    gender: "female",
    department: "Science",
    major: "HON Computer Science",
    level: "Bachelor",
    tags: ['music', 'reading'],
    friends: ['Gary', 'Will'],
};
const PostPage = () => {
    return (
    <div>
        <Provider store={createStore(reducers)}>
            <HomePage user={user} />
        </Provider>
    </div>
  );
};

export default PostPage;
