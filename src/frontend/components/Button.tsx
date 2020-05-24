import * as React from 'react';
import { connect} from 'react-redux';
import { increment } from '../actions';
import {GlobalState} from "../reducers";


interface ButtonProps {
    count: number;
    increment: (x:number) => void;
}

class Button extends React.Component<ButtonProps, {}> {
    render() {
        return (<div>
            <h1>The number is: {this.props.count}</h1>
            <button onClick={() => this.props.increment(5)}>Click Me!</button>
        </div>);
    }
}

//state has entire state of app!!
const mapStateToProps = (state: GlobalState) => { //name is by convention
    return { count: state.count }; //now it will appear as props
};

export const CBUTTON = connect(mapStateToProps, { increment })(Button);
