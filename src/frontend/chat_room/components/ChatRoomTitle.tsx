import * as React from "react";

export interface IChatRoomTitleProps {
    name: string;
}

export class ChatRoomTitle extends React.Component<IChatRoomTitleProps, {}> {
    render() {
        return <div className={'chat-room-title'}>
            <h1>{this.props.name}</h1>
        </div>;
    }
}
