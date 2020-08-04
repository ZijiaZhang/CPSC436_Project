import * as React from "react";
import {IUserProps} from "../interfaces/IUserProps";
import {Link} from "react-router-dom";

class FriendsPanelItem extends React.Component<IUserProps & {unread: boolean}, {}> {
    render(){
        return  <Link to={{pathname: "/chatRoom", search: "?user=" + this.props.username}}><li  className={this.props.unread? "unread" : ""}> <img src={this.props.avatarPath} alt="img not found" width="30" height="30"/><span>{this.props.name}</span></li></Link>

    }
}

export default FriendsPanelItem;
