import * as React from "react";
import {ChatRoomBubbles, ISingleMessage} from "./ChatRoomBubbles";
import {ChatRoomState} from "../reducer";
import {connect} from "react-redux";
import {getInitialMessages} from "../Actions";


interface IChatRoomChatAreaProps{
    messages: ISingleMessage[];
    getInitialMessages: (x: any) => any;
    user: any;
}

export class ChatRoomChatArea extends React.Component<IChatRoomChatAreaProps, {}> {
    render() {
        return <div>
            {this.props.messages.map((message, index) =>
                <ChatRoomBubbles key={index} message={message.message} status={message.status} sender={message.sender}/>)}
        </div>;
    }
    componentDidMount(): void {
        this.props.getInitialMessages(this.props.user ? this.props.user: null);
    }
}

const mapStateToProps = (state: ChatRoomState) => {
    return {messages: state.messages}
};

export const ChatRoomChatAreaConnected = connect(mapStateToProps, {getInitialMessages})(ChatRoomChatArea);
