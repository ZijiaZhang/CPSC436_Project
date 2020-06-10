import * as React from 'react';
import FriendBanner, {FriendBannerProps} from "./FriendBanner";


interface FriendListProps {
    friends: FriendBannerProps[]
}

class FriendList extends React.Component<FriendListProps, {}> {
    public right_panel = React.createRef<HTMLDivElement>();

    toggleFriendList = () => {
        const node = this.right_panel.current;
        if (node) {
            node.style.display = node.style.display =='none' ? 'block' :'none';
        }
    };

    render() {
        return (
            <div>
                <a className="glyphicon glyphicon-user right-open-button" onClick={() => this.toggleFriendList()}/>
                <div ref={this.right_panel}>
                <ul className="myFriend">
                    <p> Friends</p>
                    {this.props.friends.map((friend) => <FriendBanner key={friend.name} image_path={friend.image_path} name={friend.name}/>)}
                </ul>
                </div>
            </div>
            
        );
    }
}

export default FriendList;
