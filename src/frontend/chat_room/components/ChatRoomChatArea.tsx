import * as React from "react";
import {ChatRoomBubbles, ISingleMessage} from "./ChatRoomBubbles";
import {ChatRoomState} from "../reducer";
import {connect} from "react-redux";

interface IChatRoomChatAreaProps {
    messages: ISingleMessage[];
}

export class ChatRoomChatArea extends React.Component<IChatRoomChatAreaProps, {}> {
    render() {
        return <div>
            {this.props.messages.map((message, index) =>
                <ChatRoomBubbles key={index} message={message.message} status={message.status} sender={message.sender}/>)}
        </div>;
    }
}

const mapStateToProps = (state: ChatRoomState) => {
    return {messages: state.messages}
};

export const ChatRoomChatAreaConnected = connect(mapStateToProps, {})(ChatRoomChatArea);
