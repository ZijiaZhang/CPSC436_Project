import * as React from "react";
import {Link} from "react-router-dom";
import {IChatItem} from "./ChatList";
import {ChatType} from "../../shared/enums/ChatType";

interface IChatBlockProps {
    chatItem: IChatItem
}

export class ChatBlock extends React.Component<IChatBlockProps, {}> {
    render() {
        const partialUri = this.props.chatItem.chatType === ChatType.GroupChat ? 'group' : 'user';
        return <div>
            <Link to={{pathname: "/chatRoom", search: `?${partialUri}=` + this.props.chatItem.chatId}}>
                <img src={this.props.chatItem.avatarPath} alt="img not found"/>
                <span>{this.props.chatItem.chatName}</span>
            </Link>
        </div>;
    }
}
