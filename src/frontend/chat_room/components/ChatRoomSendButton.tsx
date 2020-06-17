import * as React from "react";
import {RefObject} from "react";
import {ChatRoomInputBox} from "./ChatRoomInputBox";
import {connect} from "react-redux";
import {send_message} from "../Actions";
import {ButtonState} from "../../shared/enums/ButtonState";
import {IButtonState} from "../../shared/interfaces/IButtonState";

interface ChatRoomSendButtonProps {
    inputBox: RefObject<ChatRoomInputBox>;
    send_message: (text: string) => any;
}

export class ChatRoomSendButton extends React.Component<ChatRoomSendButtonProps, IButtonState> {
    constructor(props: ChatRoomSendButtonProps) {
        super(props);
        this.state = {buttonState: ButtonState.ENABLED};
    }

    render() {
        return <button className={['button-enabled', 'button-disabled'][this.state.buttonState]}
                       onClick={() => {
                           let inputBox = this.props.inputBox.current;
                           if (inputBox) {
                                const inputElement = inputBox.inputElement.current;
                                if (inputElement)
                                this.props.send_message(inputElement.value)
                           }
                       }}>
            SEND
        </button>;
    }
}

export const ChatRoomSendButtonConnected = connect(()=>{}, {send_message: send_message})(ChatRoomSendButton);
