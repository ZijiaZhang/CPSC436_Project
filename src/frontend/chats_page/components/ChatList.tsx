import * as React from "react";
import {connect} from "react-redux";
import {getInitialChatItems} from "../actions";
import {IChatPageState} from "../reducer";
import {ChatBlock} from "./ChatBlock";
import {ChatType} from "../../shared/enums/ChatType";

export interface IChatItem {
    chatName: string,
    chatId: string, //This is friendUsername for individual chats, groupId for group chats
    avatarPath: string
    chatType: ChatType,
}

interface IChatListProps {
    getInitialChatItems: any,
    chatItems: IChatItem[]
}

class ChatList extends React.Component<IChatListProps, {}> {
   render() {
        return <div>
            {this.props.chatItems.map(chatItem => {
                return <ChatBlock key={'chats-page-chat-item-' + chatItem.chatId} chatItem={chatItem}/>
            })}
        </div>;
    }

    componentDidMount(): void {
        this.props.getInitialChatItems();
    }
}

const mapStateToProps = (state: IChatPageState) => {
    return {chatItems: state.chatItems}
};

export default connect(mapStateToProps, {getInitialChatItems})(ChatList);
