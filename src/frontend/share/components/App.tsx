import * as React from 'react';
import Sidebar from './Sidebar';
import FriendList from './FriendList'

const App = () => {   //this is how you make a functional component
  return (
      <div>
        <Sidebar  user_info={ {image_path: './images/test2.png', name:'Dennis'}}/>
        <FriendList  friends={[
            {image_path: './images/dora.png', name:'Will'},
            {image_path: './images/test.png', name:'Gary'},
            {image_path: './images/test2.png', name:'Dennis'},
            {image_path: './images/1.ico', name:'Rommel'}
        ]}/>
        </div>
  );
};

export default App;
