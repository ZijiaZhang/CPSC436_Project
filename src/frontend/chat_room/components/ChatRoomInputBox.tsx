import * as React from "react";
import {createRef} from "react";


export class ChatRoomInputBox extends React.Component<{}, {}> {
    inputElement = createRef<HTMLInputElement>();
    render() {
        return <div  className={'chat-room-text-input-wrap'}>
            <input ref={this.inputElement} className={'chat-room-text-input'} type="text" placeholder=" Type your message here"/>
        </div>;
    }
}
