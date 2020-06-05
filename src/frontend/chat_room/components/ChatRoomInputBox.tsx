import * as React from "react";

export class ChatRoomInputBox extends React.Component<{}, {}> {
    render() {
        return <div  className={'chat-room-text-input-wrap'}>
            <input className={'chat-room-text-input'} type="text" placeholder="type your message here"/>
        </div>;
    }
}
