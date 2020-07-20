import * as React from 'react';
import {Link} from "react-router-dom";
import {IUserProps} from "../interfaces/IUserProps";
import {connect} from "react-redux";

interface INavigationItemsProps {
    userInfo: any
}

class NavigationItems extends React.Component<INavigationItemsProps, {}> {

    render() {
        return (
        <div>
            <a><img src={this.props.userInfo.avatarPath ? this.props.userInfo.avatarPath : './images/photoP.png'} alt='img not found'
                    width="100" height="100"/><p className="username-display">{"   " + this.props.userInfo.fullname}</p></a>
            <Link to="/" className="glyphicon glyphicon-home">Home</Link>
            <Link to="/chatRoom" className="glyphicon glyphicon-envelope">Chats</Link>
            <Link to="/settings" className="glyphicon glyphicon-cog">Profile</Link>
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

export default connect(mapStateToProps)(NavigationItems);
