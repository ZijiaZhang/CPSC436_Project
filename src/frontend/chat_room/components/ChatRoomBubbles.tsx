import * as React from "react";
import {IUserProps} from "../../shared/interfaces/IUserProps";
export enum MessageStatus{
    RECEIVED,
    SENT,
    NOT_SENT
}

export interface ISingleMessage {
    message: string;
    status: MessageStatus;
    sender: any;
}

export class ChatRoomBubbles extends React.Component<ISingleMessage, {}> {
    render() {
        return <div className={'conversation-bubble-wrap'}>
            <div className={['received', 'sent', 'unsent'][this.props.status]}>
            <p className = 'conversation-bubble'>{this.props.message}</p>
            <img className='conversation-avatar' src={this.props.sender} alt={this.props.sender}/>
            </div>
        </div>;
    }
}
