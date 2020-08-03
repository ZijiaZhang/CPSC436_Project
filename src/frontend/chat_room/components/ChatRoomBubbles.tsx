import * as React from "react";
import {IUser} from "../../../shared/ModelInterfaces";
import {MessageStatus} from "../../../shared/SocketEvents";

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
