import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import CSS from 'csstype';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import {Header} from "./Header";

type LocationState = {
    from: Location;
};

interface LoginPageState {
    username: string,
    password: string,
}

class Login extends Component<RouteComponentProps<{}, StaticContext, LocationState>, LoginPageState> {
    constructor(props: RouteComponentProps<{}, StaticContext, LocationState>) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };
    }

    render() {
        const login_style: CSS.Properties = {
           paddingTop: "50px"
        };
        return (
            <div>
            <Header/>
            <div className="col-md-6 col-md-offset-3" style={login_style}>

            <h2>Login</h2>
            <form name="form" action="/api/v1/users/login" method="post" >
                <div className='form-group'>
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" name="username"/>
                </div>
                <div className='form-group' >
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" type="submit">Login</button>
                    <Link to="/register" className="btn btn-link">Register</Link>
                </div>
                {<div className="help-block">{new URLSearchParams(this.props.location.search).get("err")}</div>}
            </form>
        </div></div>
        );
    }
}

export default Login