import {requestAPIJson} from "../../shared/Networks";
import {IChat, IGroup, IUser} from "../../../shared/ModelInterfaces";
import {Action, Dispatch} from "redux";
import {getAllGroups, getCurrentUser, getManyUsersInfo, user} from "../../shared/globleFunctions";
import {IChatItem} from "../components/ChatList";
import {ChatType} from "../../shared/enums/ChatType";
import {history} from "../../../AppRouter";

export enum ChatPageAction {
    ADD_CHAT_ITEMS,
    SELECT_FRIEND,
    DESELECT_FRIEND,
    DESELECT_ALL,
    LOAD_FRIENDS
}

async function getAllIndividualChats(): Promise<IChat[]> {
    return requestAPIJson('api/v1/chats/latestChats');
}

async function createNewGroup(groupName: string): Promise<IGroup> {
    return requestAPIJson(`api/v1/groups/${groupName}`, 'PUT');
}

async function addUsersIntoGroup(groupId: string, usernames: string[]): Promise<IGroup> {
    const promiseList = usernames.map(username => requestAPIJson('api/v1/groups', 'POST', {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }, {groupID: groupId, username}));
    return Promise.all(promiseList).then((groups: IGroup[]) => groups.pop()!);
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
            chatName: friend.fullname,
            chatId: friend.username,
            avatarPath: friend.avatarPath ? friend.avatarPath : './images/photoP.png',
            chatType: ChatType.IndividualChat
        } as IChatItem));

        dispatch({
            type: ChatPageAction.ADD_CHAT_ITEMS,
            items: chatItems
        });
    }
};

export const loadFriends = () => {
    return async function(dispatch: Dispatch<Action>) {
        if (!user) {
            await getCurrentUser();
        }

        const friends: IUser[] = await getManyUsersInfo(user.friendUsernames);
        dispatch({
            type: ChatPageAction.LOAD_FRIENDS,
            friends
        })
    }
};

export const selectFriend = (friendUsername: string) => {
    return function (dispatch: Dispatch<Action>) {
        dispatch({
            type: ChatPageAction.SELECT_FRIEND,
            friendUsername
        })
    }
};

export const deselectFriend = (friendUsername: string) => {
    return function (dispatch: Dispatch<Action>) {
        dispatch({
            type: ChatPageAction.DESELECT_FRIEND,
            friendUsername
        })
    }
};

export const createGroup = (friendUsernames: string[], groupName: string) => {
    if (friendUsernames.length === 0) return;

    return async function (dispatch: Dispatch<Action>) {
        const newGroup: IGroup = await createNewGroup(groupName);
        const modifiedGroup = await addUsersIntoGroup(newGroup._id, friendUsernames);

        if(user) {
            user.groups.push(modifiedGroup._id);
        }

        dispatch({
            type: ChatPageAction.DESELECT_ALL
        });

        history.push(`/chatRoom?group=${modifiedGroup._id}`);
    }
};
