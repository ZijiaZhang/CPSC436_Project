import * as React from "react";
import {RefObject} from "react";
import {ChatRoomInputBox} from "./ChatRoomInputBox";
import {connect} from "react-redux";
import {sendMessage} from "../Actions";
import {ButtonState} from "../../shared/enums/ButtonState";
import {IButtonState} from "../../shared/interfaces/IButtonState";
import {IUser} from "../../../shared/ModelInterfaces";


interface IChatRoomSendButtonProps {
    inputBox: RefObject<ChatRoomInputBox>;
    sendMessage: (text: string, receiver: string|null) => any;
    user: IUser;
}

export class ChatRoomSendButton extends React.Component<IChatRoomSendButtonProps, IButtonState> {
    constructor(props: IChatRoomSendButtonProps) {
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
                                this.props.sendMessage(inputElement.value, this.props.user.username)
                           }
                       }}>
            SEND
        </button>;
    }
}

export const ChatRoomSendButtonConnected = connect(()=>{return {}},
    {sendMessage: sendMessage})(ChatRoomSendButton);
