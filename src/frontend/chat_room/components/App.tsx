import * as React from 'react';
import {ChatRoomChatArea} from "./ChatRoomChatArea";
import {MessageStatusEnum} from "./ChatRoomBubbles";
import {ChatRoomInputBox} from "./ChatRoomInputBox";
import {ChatRoomSendButton} from "./ChatRoomSendButton";
import {ChatRoomTitle} from "./ChatRoomTitle";


const ChatRoom = () => {
  return (
      <div>
          <ChatRoomTitle name={'Gary'}/>
        <ChatRoomChatArea messages={[{message: "Hello", status : MessageStatusEnum.RECEIVED},
                                      {message: "Hello", status : MessageStatusEnum.SENT},
          {message: "Hello", status : MessageStatusEnum.NOT_SENT} ]} />
      <div className={'chat-room-input-area'}>
        <ChatRoomInputBox/>
        <ChatRoomSendButton/>
      </div>
      </div>
  );
};

export default ChatRoom;
