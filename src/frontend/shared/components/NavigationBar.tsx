import * as React from 'react';
import NavigationItems from "./NavigationItems";
import {connect} from "react-redux";
import {loadUserInfo} from "../../settings/actions";

interface INavigationBarProps {
    loadUserInfo: any,
    userInfo: any
}

class NavigationBar extends React.Component<INavigationBarProps, {}> {
    sideBar = React.createRef<HTMLDivElement>();
    width: number = 0;

    constructor(props:INavigationBarProps){
        super(props);
    }

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
                <NavigationItems />
                </div>
            </div>
        );
    }

    async componentDidMount() {
		try {
			let response = await fetch('http://localhost:3000/api/v1/users', {
				method: 'GET'
			});
            let data = await response.json();
            this.props.loadUserInfo(data);
		} catch(e) {
            console.log(e.message);
        }
    }
}
const mapStateToProps = (state: { userInfo: any }) => {
    return {
        userInfo: state.userInfo,
    };
};

export default connect(mapStateToProps, {loadUserInfo})(NavigationBar);
