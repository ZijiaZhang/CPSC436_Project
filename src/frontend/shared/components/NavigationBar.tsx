import * as React from 'react';
import NavigationItems from "./NavigationItems";
import {IUserProps} from "../interfaces/IUserProps";

class NavigationBar extends React.Component<{}, IUserProps> {
    sideBar = React.createRef<HTMLDivElement>();
    width: number = 0;

    constructor(props:{}){
        super(props);
        this.state = {name: '', avatarPath: ''}
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
                <NavigationItems avatarPath={this.state.avatarPath} name={this.state.name}/>
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
            let name = data.username;
            this.setState({name});
            console.log(name);
		} catch(e) {
            console.log(e.message);
        }
    }
}

export default NavigationBar;
