import * as React from 'react';
import UserProfile from "./UserProfile";
import {connect, Provider} from "react-redux";
import {createStore} from "redux";
import reducers from "../reducers";

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
