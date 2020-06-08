import React, {Component} from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

import App from "./frontend/share/components/App";
import PostPage from "./frontend/posts_page/components/App";
import ChatRoom from "./frontend/chat_room/components/App";
import Settings from "./frontend/settings/components/App";

class AppRouter extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={App}/>
                        <Route exact path="/settings" component={Settings} />
                        <Route exact path="/postsPage" component={PostPage} />
                        <Route exact path="/chatRoom" component={ChatRoom} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default AppRouter;
