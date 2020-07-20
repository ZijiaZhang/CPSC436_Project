import React, {Component} from "react";
import {
    Route,
    Switch
} from "react-router-dom";

import PostPage from "./frontend/posts_page/components/App";
import ChatRoom from "./frontend/chat_room/components/App";
import Settings from "./frontend/settings/components/App";
import NavigationBar from "./frontend/shared/components/NavigationBar";
import FriendsPanel from "./frontend/shared/components/FriendsPanel";
import Login from "./frontend/login_register/components/Login";
import Register from "./frontend/login_register/components/Register"
import {Provider} from "react-redux";
import {createStore} from "redux";
import userReducers from "./frontend/settings/reducers";


class AppRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route exact path="/" component={Home}/>
                <Route path="/settings" component={Home}/>
                <Route path="/chatRoom" component={Home}/>
            </Switch>
        );
    }
}

const Home = () => {
    return (
        <Provider store={createStore(userReducers)}>
            <div className={'row'}>
                <NavigationBar/>
                <div className="central-panel">
                    <Switch>
                        <Route exact path="/" component={PostPage}/>
                        <Route path="/settings" component={Settings} />
                        <Route path="/chatRoom" component={ChatRoom} />
                    </Switch>
                </div>
                <FriendsPanel />
            </div>
        </Provider>
    );
};

export default AppRouter;
