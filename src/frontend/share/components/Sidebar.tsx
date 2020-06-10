import * as React from 'react';
import MenuItem from "./MenuItem";
import {FriendBannerProps} from "./FriendBanner";

interface SidebarProps {
    user_info: FriendBannerProps;
}

class Sidebar extends React.Component<SidebarProps, {}> {
    sideBar = React.createRef<HTMLDivElement>();

    toggleButton = () => {
        let element = this.sideBar.current;
        if (element) {
            element.style.display = element.style.display==="none" ? "block": "none";
        }
    };

    render() {
        return (
            <div className={'sidebar-container'}>
                <button className="openbtn" onClick={() => this.toggleButton()}>&#9776;</button>
                <div ref={this.sideBar} className="sidebar">
                <MenuItem   image_path={this.props.user_info.image_path} name={this.props.user_info.name}/>
                </div>
            </div>
        );
    }
}

export default Sidebar;
