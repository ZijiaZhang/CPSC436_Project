import * as React from 'react';
import {ChatRoomChatAreaConnected} from "./ChatRoomChatArea";
import {ChatRoomInputBox} from "./ChatRoomInputBox";
import {ChatRoomSendButtonConnected} from "./ChatRoomSendButton";
import {ChatRoomTitle} from "./ChatRoomTitle";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import reducer from "../reducer"
import {createRef} from "react";
import thunk from 'redux-thunk'


export const chatRoomStore = createStore(reducer, applyMiddleware(thunk));

const ChatRoom = () => {
   let ref = createRef<ChatRoomInputBox>();
  return (
      <Provider store={chatRoomStore}>
      <div>
          <ChatRoomTitle name={'Gary'}/>
        <ChatRoomChatAreaConnected />
      <div className={'chat-room-input-area'}>
        <ChatRoomInputBox ref={ref}/>
        <ChatRoomSendButtonConnected inputBox={ref}/>
      </div>
      </div>
      </Provider>
  );
};

export default ChatRoom;
