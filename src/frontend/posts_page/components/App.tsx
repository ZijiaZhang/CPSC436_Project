import React from "react";
import reducers from '../reducers';
import {createStore} from "redux";
import {Provider} from "react-redux";
import HomePage from "./HomePage";

const user = {
    name: 'Denise',
    avatarPath: './images/test2.png',
    gender: "female",
    department: "Science",
    major: "HON Computer Science",
    level: "Bachelor",
    interests: ['music', 'reading'],
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
