import * as React from 'react';
import {Link} from "react-router-dom";
import {IUserProps} from "../interfaces/IUserProps";

class NavigationItems extends React.Component<IUserProps,{}> {
    render() {
        return ( 
        <div>
            <a><img src={this.props.avatarPath} alt="img not found" width="100" height="100"/><p>{this.props.name}</p></a>
            <Link to="/" className="glyphicon glyphicon-home">Home</Link>
            <Link to="/searchPage" className="glyphicon glyphicon-user">Friends</Link>
            <Link to="/chatRoom" className="glyphicon glyphicon-envelope">Chats</Link>
            <Link to="/settings" className="glyphicon glyphicon-cog">Setting</Link>
            <a href="/api/v1/users/logout" className="glyphicon glyphicon-log-out">Logout</a>
        </div>
        );
    }
}

export default NavigationItems;
