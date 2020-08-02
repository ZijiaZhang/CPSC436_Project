import * as React from "react";
import {IUserProps} from "../../shared/interfaces/IUserProps";
import {IUser} from "../../../shared/ModelInterfaces";
export enum MessageStatus{
    RECEIVED,
    SENT,
    NOT_SENT
}

export interface ISingleMessage {
    message: string;
    status: MessageStatus;
    sender: IUser;
}

export class ChatRoomBubbles extends React.Component<ISingleMessage, {}> {
    render() {
        return <div className={'conversation-bubble-wrap'}>
            <div className={['received', 'sent', 'unsent'][this.props.status]}>
                <img className={'conversation-avatar-' + ['received', 'sent', 'unsent'][this.props.status]}
                     src={this.props.sender.avatarPath ? this.props.sender.avatarPath : './images/photoP.png'} alt={this.props.sender.fullname}/>
                <p className = {'conversation-bubble ' + ['received', 'sent', 'unsent'][this.props.status]} >{this.props.message}</p>
            </div>
        </div>;
    }
}
