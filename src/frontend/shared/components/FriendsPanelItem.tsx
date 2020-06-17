import * as React from "react";
import {IUserProps} from "../interfaces/IUserProps";

class FriendsPanelItem extends React.Component<IUserProps, {}> {
    render(){
        return <li>
            <img src={this.props.avatarPath} alt="img not found" width="30" height="30"/><span>{this.props.name}</span>
        </li>
    }
}

export default FriendsPanelItem;
