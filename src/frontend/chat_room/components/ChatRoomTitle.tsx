import * as React from "react";

export interface ChatRoomTitleProps {
    name: string;
}

export class ChatRoomTitle extends React.Component<ChatRoomTitleProps, {}> {
    render() {
        return <div className={'chat-room-title'}>
            <h1>{this.props.name}</h1>
        </div>;
    }
}
