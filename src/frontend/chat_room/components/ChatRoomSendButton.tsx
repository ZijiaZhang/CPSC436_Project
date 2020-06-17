import * as React from "react";
import {ButtonStateEnum} from "../../shared/enums/ButtonStateEnum";
import {IButtonState} from "../../shared/interfaces/IButtonState";

export class ChatRoomSendButton extends React.Component<{}, IButtonState> {
    constructor(props: {}) {
        super(props);
        this.state = {buttonState: ButtonStateEnum.ENABLED};
    }

    render() {
        return <button className={['button-enabled', 'button-disabled'][this.state.buttonState]}>
            SEND
        </button>;
    }
}
