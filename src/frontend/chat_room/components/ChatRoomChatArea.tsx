import * as React from "react";
import {ChatRoomBubbles, ISingleMessage} from "./ChatRoomBubbles";
import {ChatRoomState} from "../reducer";
import {connect} from "react-redux";
import {getInitialMessages, receiveNewMessage} from "../Actions";
import * as io from "socket.io-client";
import {MessageStatus, SocketEvents} from "../../../shared/SocketEvents";
import {convert_to_ISingeleMessage, setUnread} from "../../shared/globleFunctions";
import {IChat, IUser} from "../../../shared/ModelInterfaces";
import {requestAPIJson} from "../../shared/Networks";
import {Home} from "../../../AppRouter";



interface IChatRoomChatAreaProps{
    messages: ISingleMessage[];
    getInitialMessages: (x: any) => any;
    receiveNewMessage: (x: ISingleMessage) => any;
    user: IUser;
}

export class ChatRoomChatArea extends React.Component<IChatRoomChatAreaProps, {}> {

    constructor(props: IChatRoomChatAreaProps) {
        super(props);
        Home.socket.off(SocketEvents.ReceiveMessage);
        Home.socket.on(SocketEvents.ReceiveMessage, async (data: any) => {
            let mesage: IChat = data.message;
            if (mesage.senderUsername!== this.props.user.username) {
                setUnread(true);
                return;
            }
            this.props.receiveNewMessage(await convert_to_ISingeleMessage(mesage, MessageStatus.RECEIVED));
        });
    }

    render() {
        return <div>
            {this.props.messages.map((message: ISingleMessage, index: number) =>
                <ChatRoomBubbles key={index} message={message.message} status={message.status} sender={message.sender}/>)}
        </div>;
    }

    componentDidMount(): void {
        this.props.getInitialMessages(this.props.user.username ? this.props.user.username: null);
    }

    componentWillUnmount(): void {
        console.log("unmount");
        Home.socket.off(SocketEvents.ReceiveMessage);
        Home.socket.on(SocketEvents.ReceiveMessage, async (data: any) => {
                setUnread(true);
        })
    }
}

const mapStateToProps = (state: ChatRoomState) => {
    return {messages: state.messages}
};

export const ChatRoomChatAreaConnected = connect(mapStateToProps,
    {getInitialMessages, receiveNewMessage})(ChatRoomChatArea);
