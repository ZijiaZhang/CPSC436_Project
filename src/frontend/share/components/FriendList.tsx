import * as React from 'react';
import FriendBanner, {FriendBannerProps} from "./FriendBanner";


export interface FriendListProps {
    friends: FriendBannerProps[]
}

class FriendList extends React.Component<FriendListProps, {}> {
    public right_collapse = React.createRef<HTMLDivElement>();
    width: number = 0;

    toggleFriendList = () => {
        const node = this.right_collapse.current;
        if (node) {
            this.width = this.width || node.clientWidth;
            node.style.width = node.style.width =='0px' ? this.width.toString() :'0px';
        }
    };

    render() {
        return (
            <div>
                <a className="glyphicon glyphicon-user right-open-button" onClick={() => this.toggleFriendList()}/>
                <div ref={this.right_collapse} className="right_collapse">
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
