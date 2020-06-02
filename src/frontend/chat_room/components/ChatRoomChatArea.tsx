import * as React from "react";
import {ChatRoomBubbles, SingleMessage} from "./ChatRoomBubbles";

interface ChatRoomChatAreaProps {
    messages: SingleMessage[];
}

export class ChatRoomChatArea extends React.Component<ChatRoomChatAreaProps, {}> {
    render() {
        return <div>
            {this.props.messages.map((message, index) =>
                <ChatRoomBubbles key={index} message={message.message} status={message.status}/>)}
        </div>;
    }
}
