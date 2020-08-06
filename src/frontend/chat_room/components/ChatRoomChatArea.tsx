import * as React from "react";
import {ChatRoomBubbles, ISingleMessage} from "./ChatRoomBubbles";
import {ChatRoomState} from "../reducer";
import {connect} from "react-redux";
import {getInitialMessages, receiveNewMessage} from "../Actions";
import {MessageStatus, SocketEvents} from "../../../shared/SocketEvents";
import {convert_to_ISingeleMessage, setUnread} from "../../shared/globleFunctions";
import {IGroup, IUser} from "../../../shared/ModelInterfaces";
import {Home} from "../../../AppRouter";
import {ChatType} from "../../shared/enums/ChatType";


interface IChatRoomChatAreaProps{
    messages: ISingleMessage[];
    getInitialMessages: (x: any, y: ChatType) => any;
    receiveNewMessage: (x: ISingleMessage) => any;
    entity: IUser | IGroup;
    chatType: ChatType;
}

export class ChatRoomChatArea extends React.Component<IChatRoomChatAreaProps, {}> {

    constructor(props: IChatRoomChatAreaProps) {
        super(props);
        Home.socket.off(SocketEvents.ReceiveMessage);
        Home.socket.on(SocketEvents.ReceiveMessage, async (data: any) => {
            let message = data.message;
            if (this.props.chatType === ChatType.IndividualChat && message.senderUsername!== (this.props.entity as IUser).username) {
                setUnread(true);
                return;
            }
            this.props.receiveNewMessage(await convert_to_ISingeleMessage(message, MessageStatus.RECEIVED));
        });
    }

    render() {
        return <div>
            {this.props.messages.map((message: ISingleMessage, index: number) =>
                <ChatRoomBubbles key={index} message={message.message} status={message.status} sender={message.sender}/>)}
        </div>;
    }

    componentDidMount(): void {
        const entityId = this.props.chatType === ChatType.IndividualChat ? (this.props.entity as IUser).username : (this.props.entity as IGroup)._id;
        this.props.getInitialMessages(entityId ? entityId: null, this.props.chatType);
    }

    componentWillUnmount(): void {
        Home.socket.off(SocketEvents.ReceiveMessage);
        Home.socket.on(SocketEvents.ReceiveMessage, async (data: any) => {
                setUnread(true);
        })
    }

    componentDidUpdate(prevProps: Readonly<IChatRoomChatAreaProps>, prevState: Readonly<{}>, snapshot?: any): void {
        document.querySelector('.central-panel')!.scrollTo(0, document.querySelector('.central-panel')!.scrollHeight)
    }
}

const mapStateToProps = (state: ChatRoomState) => {
    return {messages: state.messages}
};

export const ChatRoomChatAreaConnected = connect(mapStateToProps,
    {getInitialMessages, receiveNewMessage})(ChatRoomChatArea);
