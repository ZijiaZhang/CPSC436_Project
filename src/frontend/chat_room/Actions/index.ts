export enum ChatRoomActions{
    RECEIVE_MESSAGE,
    SEND_MESSAGE
}

export const sendMessage = (text: string) => {
    return {
        type: ChatRoomActions.SEND_MESSAGE,
        message: text,
    };
};
