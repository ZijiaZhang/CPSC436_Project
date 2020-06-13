import React, {Component} from "react";
import {
    Route,
    Switch
} from "react-router-dom";

import PostPage from "./frontend/posts_page/components/App";
import ChatRoom from "./frontend/chat_room/components/App";
import Settings from "./frontend/settings/components/App";
import Sidebar from "./frontend/share/components/Sidebar";
import FriendList from "./frontend/share/components/FriendList";
import SearchPage from "./frontend/search_page/components/App";

class AppRouter extends Component {
    render() {
        return (
                <div>
                    <Sidebar  user_info={ {image_path: './images/test2.png', name:'Denise'}}/>
                    <div className="central-panel">
                        <Switch>
                            <Route exact path="/" component={Settings} />
                            <Route path="/postsPage" component={PostPage} />
                            <Route path="/chatRoom" component={ChatRoom} />
                            <Route path="/searchPage" component={SearchPage} />
                        </Switch>
                    </div>
                    <FriendList  friends={[
                        {image_path: './images/dora.png', name:'Will'},
                        {image_path: './images/test.png', name:'Gary'},
                        {image_path: './images/test2.png', name:'Denise'},
                        {image_path: './images/1.ico', name:'Rommel'}
                    ]}/>
                </div>
        );
    }
}

export default AppRouter;
