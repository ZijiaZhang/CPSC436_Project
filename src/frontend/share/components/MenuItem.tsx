import * as React from 'react';
import {FriendBannerProps} from "./FriendBanner";


class MenuItem extends React.Component<FriendBannerProps,{}> {
    render() {
        return ( 
        <div>
            <a><img src={this.props.image_path} alt="img not found" width="100" height="100"/><p>{this.props.name}</p></a>
            <a href="#" className="glyphicon glyphicon-home">Home</a>
            <a href="#" className="glyphicon glyphicon-user">Chats</a>
            <a href="#" className="glyphicon glyphicon-cog">Setting</a> 
        </div>
        );
    }
}

export default MenuItem;
