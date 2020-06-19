import * as React from "react";
import {ChatRoomBubbles, ISingleMessage} from "./ChatRoomBubbles";

interface IChatRoomChatAreaProps {
    messages: ISingleMessage[];
}

export class ChatRoomChatArea extends React.Component<IChatRoomChatAreaProps, {}> {
    render() {
        return <div>
            {this.props.messages.map((message, index) =>
                <ChatRoomBubbles key={index} message={message.message} status={message.status}/>)}
        </div>;
    }
}
