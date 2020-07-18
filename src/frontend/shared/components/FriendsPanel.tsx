import * as React from 'react';
import FriendsPanelItem from "./FriendsPanelItem";
import {IUserProps} from "../interfaces/IUserProps";
import {connect} from "react-redux";
import {getCurrentUser, getManyUsersInfo} from "../globleFunctions";
import {IUser} from "../../posts_page/components/UserBlock";
import {loadUserFriends, loadUserInfo} from "../../settings/actions";


export interface IFriendsPanelProps {
    userInfo: IUser,
    loadUserFriends: any,
    userFriends: IUser[],
    loadUserInfo: any
}

class FriendsPanel extends React.Component<IFriendsPanelProps, {}> {
    public rightCollapse = React.createRef<HTMLDivElement>();
    width: number = 0;

    toggleFriendList = () => {
        const node = this.rightCollapse.current;
        if (node) {
            this.width = this.width || node.clientWidth;
            node.style.width = node.style.width =='0px' ? this.width.toString() :'0px';
        }
    };

    async componentDidMount() {
        const curUser = await getCurrentUser();
        this.props.loadUserInfo(curUser);
        const userFriendList = await getManyUsersInfo(this.props.userInfo.friendUsernames);
        this.props.loadUserFriends(userFriendList);
    }

    render() {
        return (
            <div>
                <a className="glyphicon glyphicon-search right-open-button" onClick={() => this.toggleFriendList()}/>
                <div ref={this.rightCollapse} className="right_collapse">
                <ul className="myFriend">
                    <p> Friends</p>
                    {this.props.userFriends.map((friend) => <FriendsPanelItem key={friend.username} avatarPath={friend.avatarPath} name={friend.fullname}/>)}
                </ul>
                </div>
            </div>
            
        );
    }

}
const mapStateToProps = (state: { userInfo: any, userFriends: any }) => {
    return {
        userInfo: state.userInfo,
        userFriends: state.userFriends
    };
};

export default connect(mapStateToProps, {loadUserFriends, loadUserInfo})(FriendsPanel);
