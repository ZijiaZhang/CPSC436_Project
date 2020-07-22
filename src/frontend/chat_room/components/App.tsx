import * as React from 'react';
import {ChatRoomChatAreaConnected} from "./ChatRoomChatArea";
import {ChatRoomInputBox} from "./ChatRoomInputBox";
import {ChatRoomSendButtonConnected} from "./ChatRoomSendButton";
import {ChatRoomTitle} from "./ChatRoomTitle";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import reducer from "../reducer"
import {createRef} from "react";
import thunk from 'redux-thunk'
import {RouteComponentProps} from "react-router-dom";
import {StaticContext} from "react-router";
import {getCurrentUser, getUserInfo} from "../../shared/globleFunctions";
import {IUser} from "../../../shared/ModelInterfaces";

type LocationState = {
    from: Location;
};

interface ChatRoomState{
    user: IUser| undefined| null;
}


export const chatRoomStore = createStore(reducer, applyMiddleware(thunk));

class ChatRoom extends React.Component<RouteComponentProps<{}, StaticContext, LocationState>, ChatRoomState>{
    constructor(props: RouteComponentProps<{}, StaticContext, LocationState>) {
        super(props);
        this.state = {user: undefined};
    }

    ref = createRef<ChatRoomInputBox>();
    render () {
        console.log('render');
        let curr_user_id = new URLSearchParams(this.props.location.search).get("user");
        if(curr_user_id && curr_user_id !== this.state.user?.username){
            this.update_user();
            return (<h1>Loading</h1>);
        }
        if (this.state.user) {
            return (
                <Provider store={chatRoomStore}>
                    <div>
                        <ChatRoomTitle name={this.state.user!.username}/>
                        <ChatRoomChatAreaConnected user={this.state.user}/>
                        <div className={'chat-room-input-area'}>
                            <ChatRoomInputBox ref={this.ref}/>
                            <ChatRoomSendButtonConnected inputBox={this.ref} user={this.state.user}/>
                        </div>
                    </div>
                </Provider>);
        } else if (this.state.user === null){
            return (<h1>Error User Not Found</h1>)
        } else if (this.state.user === undefined){
            return (<h1>Loading</h1>)
        }
    }

    async componentDidMount() {
        await this.update_user();
    }

    private async update_user() {
        let user_id = new URLSearchParams(this.props.location.search).get("user");
        if (!user_id) {
            try {
                let user = await getCurrentUser();
                this.setState({user});
                return
            } catch (e) {
                this.setState({user: null});
                return;
            }
        }
        try {
            let user = await getUserInfo(user_id);
            console.log(user);
            this.setState({user});
        } catch (e) {
            let user = null;
            this.setState({user});

        }
    }
}

export default ChatRoom;
