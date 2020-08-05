import React, {Component} from "react";
import {
    Route,
    Router,
    Switch
} from "react-router-dom";
import {createBrowserHistory} from 'history';

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
import * as io from "socket.io-client";
import {SocketEvents} from "./shared/SocketEvents";
import {setUnread} from "./frontend/shared/globleFunctions";
import ChatsPage from "./frontend/chats_page/components/App";

export const history = createBrowserHistory();

class AppRouter extends Component {

    constructor(props: {}) {
        super(props);

    }


    render() {
        return (
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route exact path="/" component={Home}/>
                <Route path="/settings" component={Home}/>
                <Route path="/chatRoom" component={Home}/>
                <Route path="/chats" component={Home}/>
            </Switch>
        );
    }
}

export class Home extends React.Component<{}, {}> {
    static socket: SocketIOClient.Socket;

    render() {
        return (
            <Provider store={createStore(userReducers)}>
                <Router history={history}>
                    <div className={'my-row'}>
                        <NavigationBar/>
                        <div className="central-panel">
                            <Switch>
                                <Route exact path="/" component={PostPage}/>
                                <Route path="/settings" component={Settings}/>
                                <Route path="/chatRoom" component={ChatRoom}/>
                                <Route path="/chats" component={ChatsPage}/>
                            </Switch>
                        </div>
                        <FriendsPanel/>
                    </div>
                </Router>
            </Provider>
        );
    }

    componentDidMount(): void {
        let socketProtocol = (window.location.protocol === 'https') ? 'wss' : 'ws';
        Home.socket = io.connect(`${socketProtocol}://${window.location.host}`, {reconnection: false});
        Home.socket.on(SocketEvents.ReceiveMessage, async (data: any) => {
            setUnread(true);
        });
    }
}


export default AppRouter;
