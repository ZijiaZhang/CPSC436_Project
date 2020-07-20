import * as React from "react";
import {ChatRoomBubbles, ISingleMessage, MessageStatus} from "./ChatRoomBubbles";
import {ChatRoomState} from "../reducer";
import {connect} from "react-redux";
import {getInitialMessages, receiveNewMessage} from "../Actions";
import * as io from "socket.io-client";
import {SocketEvents} from "../../../shared/SocketEvents";
import {convert_to_ISingeleMessage} from "../../shared/globleFunctions";
import {IUser} from "../../../shared/ModelInterfaces";



interface IChatRoomChatAreaProps{
    messages: ISingleMessage[];
    getInitialMessages: (x: any) => any;
    receiveNewMessage: (x: ISingleMessage) => any;
    user: IUser;
}

export class ChatRoomChatArea extends React.Component<IChatRoomChatAreaProps, {}> {
    socket: SocketIOClient.Socket;
    constructor(props: IChatRoomChatAreaProps) {
        super(props);
        let socketProtocol = (window.location.protocol === 'https') ? 'wss' : 'ws';
        this.socket = io.connect(`${socketProtocol}://${window.location.host}`, {reconnection: false});
        this.socket.on(SocketEvents.ReceiveMessage, async (data: any) => {
            let chat = data.message;
            this.props.receiveNewMessage(await convert_to_ISingeleMessage(chat, MessageStatus.RECEIVED));
        });
    }

    render() {
        return <div>
            {this.props.messages.map((message, index) =>
                <ChatRoomBubbles key={index} message={message.message} status={message.status} sender={message.sender}/>)}
        </div>;
    }

    componentDidMount(): void {
        this.props.getInitialMessages(this.props.user.username ? this.props.user.username: null);
    }
}

const mapStateToProps = (state: ChatRoomState) => {
    return {messages: state.messages}
};

export const ChatRoomChatAreaConnected = connect(mapStateToProps,
    {getInitialMessages, receiveNewMessage})(ChatRoomChatArea);
