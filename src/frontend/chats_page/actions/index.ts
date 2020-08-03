import {requestAPIJson} from "../../shared/Networks";
import {IChat, IUser} from "../../../shared/ModelInterfaces";
import {Action, Dispatch} from "redux";
import {getAllGroups, getCurrentUser, getManyUsersInfo, user} from "../../shared/globleFunctions";
import {IChatItem} from "../components/ChatList";
import {ChatType} from "../../shared/enums/ChatType";

export enum ChatPageAction {
    ADD_CHAT_ITEMS
}

async function getAllIndividualChats(): Promise<IChat[]> {
    return requestAPIJson('api/v1/chats/latestChats');
}

export const getInitialChatItems = () => {
    return async function (dispatch: Dispatch<Action>) {
        if (!user) {
            await getCurrentUser();
        }
        const groupIds = user.groups;
        const groups = await getAllGroups(groupIds);

        const individualChats: IChat[] = await getAllIndividualChats();
        const friendUsernames = individualChats.map(chat => chat.senderUsername === user.username ? chat.receiverUsername : chat.senderUsername);
        const chattedFriends: IUser[] = await getManyUsersInfo(friendUsernames);

        const chatItems: IChatItem[] = groups.map(group => {
            return {
                chatName: group.name,
                chatId: group._id,
                avatarPath: './images/group_emoji.jpg',
                chatType: ChatType.GroupChat,
            } as IChatItem
        });

        chattedFriends.forEach(friend => chatItems.push({
            chatName: friend.username,
            chatId: friend.username,
            avatarPath: friend.avatarPath,
            chatType: ChatType.IndividualChat
        } as IChatItem));

        dispatch({
            type: ChatPageAction.ADD_CHAT_ITEMS,
            items: chatItems
        });
    }
};
