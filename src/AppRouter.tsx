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
import SearchPage from "./frontend/search_page/components/App";
import Login from "./frontend/login_signup/containers/login/login";
import Register from "./frontend/login_signup/containers/register/register"


class AppRouter extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route path="/registerPage" component={Register}/>
                <Route path="/home" component={Home}/>
                <Route path="/settings" component={Home}/>
                <Route path="/chatRoom" component={Home}/>
                <Route path="/searchPage" component={Home}/>
            </Switch>
        );
    }
}

const Home = () => {
    return (
        <div className={'row'}>
        <NavigationBar avatarPath={'./images/test2.png'} name={'Denise'}/>
        <div className="central-panel">
            <Switch>
                <Route path="/home" component={PostPage}/>
                <Route path="/settings" component={Settings} />
                <Route path="/chatRoom" component={ChatRoom} />
                <Route path="/searchPage" component={SearchPage} />
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
}

export default AppRouter;