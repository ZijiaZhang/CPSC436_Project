import * as React from 'react';
import NavigationItems from "./NavigationItems";
import {IUserProps} from "../interfaces/IUserProps";

class NavigationBar extends React.Component<IUserProps, {}> {
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
                <NavigationItems avatarPath={this.props.avatarPath} name={this.props.name}/>
                </div>
            </div>
        );
    }
}

export default NavigationBar;
