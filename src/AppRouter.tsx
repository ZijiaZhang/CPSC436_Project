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
        <div className={'row'}>
        <NavigationBar/>
        <div className="central-panel">
            <Switch>
                <Route exact path="/" component={PostPage}/>
                <Route path="/settings" component={Settings} />
                <Route path="/chatRoom" component={ChatRoom} />
            </Switch>
        </div>
        <FriendsPanel friends={[
            {avatarPath: './images/dora.png', name:'Will'},
            {avatarPath: './images/test.png', name:'Gary'},
            {avatarPath: './images/test2.png', name:'Denise'},
            {avatarPath: './images/1.ico', name:'Rommel'}
        ]}/>
    </div>
    );
};

export default AppRouter;
