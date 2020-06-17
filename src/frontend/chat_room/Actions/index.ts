export enum ChatRoomActions{
    RECEIVE_MESSAGE,
    SEND_MESSAGE
}

export const send_message = (text: string) => {
    return {
        type: ChatRoomActions.SEND_MESSAGE,
        message: text,
    };
};
