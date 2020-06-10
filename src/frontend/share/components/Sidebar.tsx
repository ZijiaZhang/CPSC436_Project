import * as React from 'react';
import MenuItem from "./MenuItem";
import {FriendBannerProps} from "./FriendBanner";

interface SidebarProps {
    user_info: FriendBannerProps;
}

class Sidebar extends React.Component<SidebarProps, {}> {
    sideBar = React.createRef<HTMLDivElement>();
    width: number = 0;

    toggleButton = () => {
        let element = this.sideBar.current;
        if (element) {
            this.width = this.width || element.clientWidth;
            element.style.width = element.style.width==="0px" ? this.width.toString(): "0px";
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
