import * as React from "react";

export enum ChatRoomSendButtonStateEnum{
    ENABLED,
    DISABLED
}

interface ChatRoomSendButtonState {
    enabled:ChatRoomSendButtonStateEnum;
}


export class ChatRoomSendButton extends React.Component<{}, ChatRoomSendButtonState> {
    constructor(props: {}) {
        super(props);
        this.state = {enabled:ChatRoomSendButtonStateEnum.ENABLED};
    }

    render() {
        return <button className={['button-enabled', 'button-disabled'][this.state.enabled]}>
            SEND
        </button>;
    }
}
