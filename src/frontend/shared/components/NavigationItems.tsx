import * as React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {loadDisplayedFriends, loadDisplayedUser} from "../../settings/actions";
import {IUser} from "../../../shared/ModelInterfaces";
import {getManyUsersInfo} from "../globleFunctions";

interface INavigationItemsProps {
    userInfo: IUser,
    loadDisplayedUser: any,
    loadDisplayedFriends: any
}

class NavigationItems extends React.Component<INavigationItemsProps, {}> {

    loadUserProfile = async () => {
        this.props.loadDisplayedUser(this.props.userInfo);
        const friendList = await getManyUsersInfo(this.props.userInfo.friendUsernames);
        this.props.loadDisplayedFriends(friendList);
    };

    render() {
        return (
        <div>
            <ul>
            <div className="sidebar-avatar-container"><img src={this.props.userInfo.avatarPath ? this.props.userInfo.avatarPath : './images/photoP.png'} alt='img not found'
                    width="100" height="100"/><p className="username-display">{this.props.userInfo.fullname}</p></div>
            <Link to="/" ><li className="glyphicon glyphicon-home">Home</li></Link>
                <Link to="/chats" ><li className="glyphicon glyphicon-envelope">Chats</li></Link>
                <Link to="/settings" onClick={this.loadUserProfile}><li className="glyphicon glyphicon-cog">Profile</li></Link>
                <a href="/api/v1/users/logout"><li className="glyphicon glyphicon-log-out">Logout</li></a>
            </ul>
        </div>
        );
    }
}

const mapStateToProps = (state: { userInfo: any }) => {
    return {
        userInfo: state.userInfo,
    };
};

export default connect(mapStateToProps, {loadDisplayedUser, loadDisplayedFriends})(NavigationItems);
