import * as React from 'react';
import {FriendBannerProps} from "./FriendBanner";
import {Link} from "react-router-dom";


class MenuItem extends React.Component<FriendBannerProps,{}> {
    render() {
        return ( 
        <div>
            <a><img src={this.props.image_path} alt="img not found" width="100" height="100"/><p>{this.props.name}</p></a>
            <Link to="/home" className="glyphicon glyphicon-home">Home</Link>
            <Link to="/searchPage" className="glyphicon glyphicon-user">Friends</Link>
            <Link to="/chatRoom" className="glyphicon glyphicon-envelope">Chats</Link>
            <Link to="/settings" className="glyphicon glyphicon-cog">Setting</Link>
        </div>
        );
    }
}

export default MenuItem;
