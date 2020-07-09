import * as React from 'react';
import UserProfile from "./UserProfile";
import {connect, Provider} from "react-redux";
import {createStore} from "redux";
import reducers from "../reducers";

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

const Settings = () => {
    return (
        <Provider store={createStore(reducers)}>
            <div className={'height-lg'}>
                <UserProfile />
            </div>
        </Provider>
    );
};


export default Settings;
