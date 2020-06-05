import * as React from 'react';
import MenuItem from "./MenuItem";
import {FriendBannerProps} from "./FriendBanner";

interface SidebarProps {
    user_info: FriendBannerProps;
}

class Sidebar extends React.Component<SidebarProps, {}> {

    buttonCollapse = () => {
        let element = document.getElementById("mySidebar");
        if (element) {
            element.style.display = "None";
        }
    };

    buttonOpen = () => {
        let element = document.getElementById("mySidebar");
        if (element) {
            element.style.display = "Block";
        }
    };

    render() {
        return (
            <div>
                <div id="mySidebar" className="sidebar">

                <button className="openbtn" onClick={() => this.buttonCollapse()}>&#9776;</button> 
                <MenuItem   image_path={this.props.user_info.image_path} name={this.props.user_info.name}/>
                </div>     
                <div id="main">
                <button className="openbtn" onClick={() => this.buttonOpen()}>&#9776;</button> 
                </div>
            </div>
        );
    }
}

export default Sidebar;
