import * as React from 'react';
import {createRef} from 'react';
import {ChatRoomChatAreaConnected} from "./ChatRoomChatArea";
import {ChatRoomInputBox} from "./ChatRoomInputBox";
import {ChatRoomSendButtonConnected} from "./ChatRoomSendButton";
import {ChatRoomTitle} from "./ChatRoomTitle";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import reducer from "../reducer"
import thunk from 'redux-thunk'
import {RouteComponentProps} from "react-router-dom";
import {StaticContext} from "react-router";
import {getCurrentUser, getGroupByGroupId, getUserInfo} from "../../shared/globleFunctions";
import {IGroup, IUser} from "../../../shared/ModelInterfaces";
import {ChatType} from "../../shared/enums/ChatType";

type LocationState = {
    from: Location;
};

interface ChatRoomState {
    entity: IUser | IGroup | undefined | null;
    chatType: ChatType | undefined;
}


export const chatRoomStore = createStore(reducer, applyMiddleware(thunk));

class ChatRoom extends React.Component<RouteComponentProps<{}, StaticContext, LocationState>, ChatRoomState> {
    constructor(props: RouteComponentProps<{}, StaticContext, LocationState>) {
        super(props);
        this.state = {entity: undefined, chatType: undefined};
    }

    ref = createRef<ChatRoomInputBox>();

    render() {
        let curr_user_id = new URLSearchParams(this.props.location.search).get("user");
        let curr_group_id = new URLSearchParams(this.props.location.search).get("group");

        if (curr_user_id && curr_user_id !== (this.state.entity as IUser)?.username || curr_group_id && curr_group_id !== (this.state.entity as IGroup)?._id) {
            this.update_entity();
            return (<h1>Loading</h1>);
        }

        switch (this.state.chatType) {
            case ChatType.IndividualChat:
                if (this.state.entity) {
                    const user = this.state.entity as IUser;
                    return (
                        <Provider store={chatRoomStore}>
                            <div className="chat-room-container">
                                <ChatRoomTitle name={user!.fullname}/>
                                <ChatRoomChatAreaConnected chatType={ChatType.IndividualChat} entity={user}/>
                                <div className={'chat-room-input-area'}>
                                    <ChatRoomInputBox ref={this.ref}/>
                                    <ChatRoomSendButtonConnected inputBox={this.ref} entityId={user.username}
                                                                 chatType={ChatType.IndividualChat}/>
                                </div>
                            </div>
                        </Provider>);
                } else if (this.state.entity === null) {
                    return (<h1>Error User Not Found</h1>)
                }
                break;
            case ChatType.GroupChat:
                if (this.state.entity) {
                    const group = this.state.entity as IGroup;
                    return (
                        <Provider store={chatRoomStore}>
                            <div>
                                <ChatRoomTitle name={group!.name}/>
                                <ChatRoomChatAreaConnected chatType={ChatType.GroupChat} entity={group}/>
                                <div className={'chat-room-input-area'}>
                                    <ChatRoomInputBox ref={this.ref}/>
                                    <ChatRoomSendButtonConnected inputBox={this.ref} entityId={group._id}
                                                                 chatType={ChatType.GroupChat}/>
                                </div>
                            </div>
                        </Provider>);
                } else if (this.state.entity === null) {
                    return (<h1>Error Group Not Found</h1>)
                }
                break;
            default:
                return (<h1>Loading</h1>);
        }
    }

    async componentDidMount() {
        await this.update_entity();
    }

    private async update_entity() {
        let user_id = new URLSearchParams(this.props.location.search).get("user");
        let group_id = new URLSearchParams(this.props.location.search).get("group");

        if (group_id) {
            try {
                let group = await getGroupByGroupId(group_id);
                this.setState({entity: group, chatType: ChatType.GroupChat});
                return;
            } catch (e) {
                this.setState({entity: null, chatType: ChatType.GroupChat});
                return;
            }
        } else {
            if (!user_id) {
                try {
                    let user = await getCurrentUser();
                    this.setState({entity: user, chatType: ChatType.IndividualChat});
                    return;
                } catch (e) {
                    this.setState({entity: null, chatType: ChatType.IndividualChat});
                    return;
                }
            }
            try {
                let user = await getUserInfo(user_id);
                this.setState({entity: user, chatType: ChatType.IndividualChat});
            } catch (e) {
                this.setState({entity: null, chatType: ChatType.IndividualChat});

            }
        }
    }
}

export default ChatRoom;
