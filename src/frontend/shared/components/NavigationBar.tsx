import * as React from 'react';
import NavigationItems from "./NavigationItems";
import {connect} from "react-redux";
import {loadUserInfo} from "../../settings/actions";
import {requestAPIJson} from "../Networks";

interface INavigationBarProps {
    loadUserInfo: any,
    userInfo: any
}

class NavigationBar extends React.Component<INavigationBarProps, {}> {
    sideBar = React.createRef<HTMLDivElement>();

    constructor(props:INavigationBarProps){
        super(props);
    }

    toggleButton = () => {
        let element = this.sideBar.current;
        if (element) {
            element.style.width==="0px" ? this.expand(): this.retract();
        }
    };

    retract(){
        let element = this.sideBar.current;
        if (element) {
            element.style.width = "0px";
        }
    }

    expand() {
        let element = this.sideBar.current;
        if (element) {
            element.style.width = '';
        }
    }

    render() {
        return (
            <div className={'sidebar-container'} ref={this.sideBar}>
                <button className="glyphicon glyphicon-th-list openbtn onleft" onClick={() => this.toggleButton()}></button>
                <img className="search-bar-logo" src='./icon/ubctantan-Blue.png'/>
                <div className="sidebar">
                <NavigationItems />
                </div>
            </div>
        );
    }

    async componentDidMount() {
        if (window.innerWidth < 1100){
            this.retract();
        }
		try {
			let data = await requestAPIJson('/api/v1/users');
            this.props.loadUserInfo(data);
		} catch(e) {
        }
    }

    componentDidUpdate(prevProps: Readonly<INavigationBarProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if (window.innerWidth < 1100){
            this.retract();
        }
    }
}
const mapStateToProps = (state: { userInfo: any }) => {
    return {
        userInfo: state.userInfo,
    };
};

export default connect(mapStateToProps, {loadUserInfo})(NavigationBar);
