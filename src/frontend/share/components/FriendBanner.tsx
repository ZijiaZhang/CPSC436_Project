import * as React from "react";
import FriendList from "./FriendList";

export interface FriendBannerProps {
    image_path: string;
    name: string
}

class FriendBanner extends React.Component<FriendBannerProps, FriendList> {
    render(){
        return <li>
            <img src={this.props.image_path} alt="img not found" width="30" height="30"/><span>{this.props.name}</span>
        </li>
    }
}

export default FriendBanner;
