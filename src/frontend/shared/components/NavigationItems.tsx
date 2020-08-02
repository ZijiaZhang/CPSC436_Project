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
            <a><img src={this.props.userInfo.avatarPath ? this.props.userInfo.avatarPath : './images/photoP.png'} alt='img not found'
                    width="100" height="100"/><p className="username-display">{this.props.userInfo.fullname}</p></a>
            <Link to="/" className="glyphicon glyphicon-home">Home</Link>
            <Link to="/chats" className="glyphicon glyphicon-envelope">Chats</Link>
            <Link to="/settings" className="glyphicon glyphicon-cog" onClick={this.loadUserProfile}>Profile</Link>
            <a href="/api/v1/users/logout" className="glyphicon glyphicon-log-out">Logout</a>
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
