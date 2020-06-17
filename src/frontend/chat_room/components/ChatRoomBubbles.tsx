import * as React from "react";
export enum MessageStatusEnum{
    RECEIVED,
    SENT,
    NOT_SENT
}

export interface ISingleMessage {
    message: string;
    status: MessageStatusEnum;
}

export class ChatRoomBubbles extends React.Component<ISingleMessage, {}> {
    render() {
        return <div className={'conversation-bubble-wrap'}>
            <p className={['received conversation-bubble', 'sent conversation-bubble', 'unsent conversation-bubble'][this.props.status]}>{this.props.message}</p>
        </div>;
    }
}
