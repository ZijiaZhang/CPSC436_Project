import React from "react";
import {connect} from "react-redux";
import {loadUserFriends, loadUserInfo} from "../../settings/actions";
import {getManyUsersInfo} from "../../shared/globleFunctions";

export interface IUser {
    _id: string,
    username: string,
    fullname: string,
    avatarPath: string,
    gender: string,
    department: string,
    major: string,
    level: string,
    tags: string[],
    friendUsernames: string[],
}

interface IUserBlockProps {
    displayedUser: IUser,
    registeredUser: IUser,
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
        let friends = this.props.registeredUser.friendUsernames.concat(this.props.displayedUser.username);
        await this.updateUserInfo(friends);
    };

    updateUserInfo = async (friends: string[]) => {
        let updatedUser = {
            friendUsernames: friends
        };
        let response = await fetch('http://localhost:3000/api/v1/users/' + this.props.registeredUser.username, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser)
        });
        let responseData = await response.json();
        this.props.loadUserInfo(responseData);
        let friendsInfo = await getManyUsersInfo(friends);
        this.props.loadUserFriends(friendsInfo);
        console.log(responseData);
    };

    deleteFriend = async () => {
        let index = this.props.registeredUser.friendUsernames.indexOf(this.props.displayedUser.username);
        let friends = this.props.registeredUser.friendUsernames.slice(0, this.props.registeredUser.friendUsernames.length);
        friends.splice(index, 1);
        await this.updateUserInfo(friends);
    };

    render() {
        const iconStyle = {margin: "0px 5px 0px 0px"};
        const friendRelatedButton = this.props.userInfo.friendUsernames.includes(this.props.displayedUser.username) ?
            <button className="user-block-friends-button" onClick={this.deleteFriend}>
                <span className="fa fa-check" style={iconStyle}/> Friends</button> :
            <button className="user-block-stranger-button" onClick={this.addFriend}>
                <span className={'glyphicon glyphicon-user'} /> Add Friend</button>;
        return (
            <div className="post-block">
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
                    <button className="user-block-message-button">
                        <span className={'fa fa-comments-o'}/> Send Message</button>
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
