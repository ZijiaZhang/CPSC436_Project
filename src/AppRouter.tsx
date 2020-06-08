import React, {Component} from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
} from "react-router-dom";

import sideBar from "./frontend/share/components/App";
import postsPage from "./frontend/posts_page/components/App";
import ChatRoom from "./frontend/chat_room/components/App";
import Settings from "./frontend/settings/components/App";

class AppRouter extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={postsPage}/>
                        <Route exact path="/settings" component={Settings} />
                        <Route exact path="/postsPage" component={sideBar} />
                        <Route exact path="/chatRoom" component={ChatRoom} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default AppRouter;