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

class AppRouter extends Component {
    render() {
        return (
                <div className={'row'}>
                    <Sidebar  user_info={ {image_path: './images/test2.png', name:'Dennis'}}/>
                    <div className="central-panel">
                        <Switch>
                            <Route exact path="/" component={PostPage} />
                            <Route path="/settings" component={Settings} />
                            <Route path="/chatRoom" component={ChatRoom} />
                        </Switch>
                    </div>
                    <FriendList  friends={[
                        {image_path: './images/dora.png', name:'Will'},
                        {image_path: './images/test.png', name:'Gary'},
                        {image_path: './images/test2.png', name:'Dennis'},
                        {image_path: './images/1.ico', name:'Rommel'}
                    ]}/>
                </div>
        );
    }
}

export default AppRouter;
