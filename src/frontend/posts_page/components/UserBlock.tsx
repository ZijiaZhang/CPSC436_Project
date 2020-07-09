import React from "react";
import {IUserProps} from "../../shared/interfaces/IUserProps";

export interface IUser extends IUserProps{
    name: string,
    avatarPath: string,
    gender: string,
    department: string,
    major: string,
    level: string,
    interests: string[],
    friends: string[],
}

interface IUserBlockProps {
    displayedUser: IUser,
    registeredUser: IUser
}
interface IUserBlockState {

}

class UserBlock extends React.Component<IUserBlockProps, IUserBlockState> {

    constructor(props: IUserBlockProps) {
        super(props);
        this.state = {
        };
    };

    addFriend = () => {

    };

    deleteFriend = () => {

    };

    render() {
        const iconStyle = {margin: "0px 5px 0px 0px"};
        const friendRelatedButton = this.props.registeredUser.friends.includes(this.props.displayedUser.name) ?
            <button className="user-block-friends-button" onClick={this.deleteFriend}>
                <span className="fa fa-check" style={iconStyle}/>Friends</button> :
            <button className="user-block-stranger-button" onClick={this.addFriend}>Add Friend</button>;
        return (
            <div className="post-block">
                <div className="user-block-user-info">
                    <img className="user-block-avatar" src={this.props.displayedUser.avatarPath} alt="img not found"/>
                    <div className="user-block-user-detail">
                        <p className="user-block-name">{this.props.displayedUser.name}</p>
                        <p className="user-block-department">{this.props.displayedUser.level} of {this.props.displayedUser.department}</p>
                        <p className="user-block-major">{this.props.displayedUser.major}</p>
                    </div>
                </div>
                <div className="user-block-interactions">
                    {friendRelatedButton}
                    <button className="user-block-message-button">Send Message</button>
                </div>
            </div>
        );
    }
}
export default UserBlock
