import React from "react";
import {connect} from "react-redux";
import {loadUserFriends, loadUserInfo} from "../../settings/actions";
import {getManyUsersInfo} from "../../shared/globleFunctions";
import {IUser} from "../../../shared/ModelInterfaces";
import {Link} from "react-router-dom";

interface IUserBlockProps {
    displayedUser: IUser,
    loadUserInfo: any,
    userInfo: IUser,
    userFriends: any,
    loadUserFriends: any
}
interface IUserBlockState {
}

class UserBlock extends React.Component<IUserBlockProps, IUserBlockState> {

    constructor(props: IUserBlockProps) {
        super(props);
        this.state = {
        };
    };

    addFriend = async () => {
        console.log(this.props.userInfo.friendUsernames);
        if (!this.props.userInfo.friendUsernames.includes(this.props.displayedUser.username)) {
            let friends = this.props.userInfo.friendUsernames.slice();
            friends.push(this.props.displayedUser.username);
            await this.updateUserInfo(friends);
        }
    };

    updateUserInfo = async (friends: string[]) => {
        console.log(friends);
        let updatedUser = {
            friendUsernames: friends
        };
        console.log(updatedUser);
        let response = await fetch('http://localhost:3000/api/v1/users/' + this.props.userInfo.username, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser)
        });
        let responseData = await response.json();
        let friendsInfo = await getManyUsersInfo(responseData.friendUsernames);
        this.props.loadUserInfo(responseData);
        this.props.loadUserFriends(friendsInfo);
        console.log(responseData);
        console.log(responseData.friendUsernames);
        console.log(this.props.userInfo.friendUsernames);
    };

    deleteFriend = async () => {
        console.log(this.props.userInfo.friendUsernames);
        if (this.props.userInfo.friendUsernames.includes(this.props.displayedUser.username)) {
            let index = this.props.userInfo.friendUsernames.indexOf(this.props.displayedUser.username);
            let friends = this.props.userInfo.friendUsernames.slice();
            friends.splice(index, 1);
            await this.updateUserInfo(friends);
        }
    };

    render() {
        const iconStyle = {margin: "0px 5px 0px 0px"};
        const friendRelatedButton = this.props.userInfo.friendUsernames.includes(this.props.displayedUser.username) ?
            <button className="user-block-friends-button" onClick={this.deleteFriend}>
                <span className="fa fa-check" style={iconStyle}/> Friends</button> :
            <button className="user-block-stranger-button" onClick={this.addFriend}>
                <span className={'glyphicon glyphicon-user'} /> Add Friend</button>;
        return (
            <div className="post-block" key={this.props.displayedUser._id}>
                <div className="user-block-user-info">
                    <img className="user-block-avatar" src={this.props.displayedUser.avatarPath} alt="img not found"/>
                    <div className="user-block-user-detail">
                        <p className="user-block-name">{this.props.displayedUser.fullname}</p>
                        <p className="user-block-department">{this.props.displayedUser.level} of {this.props.displayedUser.department}</p>
                        <p className="user-block-major">{this.props.displayedUser.major}</p>
                    </div>
                </div>
                <div className="user-block-interactions">
                    {friendRelatedButton}
                    <Link to={{pathname: "/chatRoom", search: "?user=" +this.props.displayedUser.username}}> <button className="user-block-message-button">
                        <span className={'fa fa-comments-o'}/> Send Message</button> </Link>
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

export default connect(mapStateToProps, {loadUserInfo, loadUserFriends})(UserBlock);
