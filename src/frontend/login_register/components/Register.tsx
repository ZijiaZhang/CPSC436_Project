import React, {Component} from 'react'
import { Link, Redirect } from 'react-router-dom';
import CSS from 'csstype';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import {Header} from "./Header";

type LocationState = {
    from: Location;
};


interface RegisterPageState {
    username: string,
    fullname: string, 
    password: string, 
    pwdConfirm: string,
}


class Register extends Component<RouteComponentProps<{}, StaticContext, LocationState>, RegisterPageState> {
    constructor(props: RouteComponentProps<{}, StaticContext, LocationState>) {
        super(props);

        this.state = {
            username: '',
            fullname: '',
            password: '',
            pwdConfirm: '',
        };
    }

    render() {
        const register_style: CSS.Properties = {
            paddingTop: "50px"
         };
        return (
            <div>
                <Header/>
            <div className="col-md-6 col-md-offset-3" style={register_style}>

            <h2>Register</h2>
            <form name="form" action="/api/v1/users/register" method="post">
                <div className='form-group'>
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" name="username" />
                </div>
                <div className='form-group'>
                    <label htmlFor="fullname">Fullname</label>
                    <input type="text" className="form-control" name="fullname" />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password"/>
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" className="form-control" name="pwdConfirm" />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" type="submit">Register</button>
                    <Link to="/login" className="btn btn-link">Cancel</Link>
                </div>
                {<div className="help-block">{new URLSearchParams(this.props.location.search).get("err")}</div>}
            </form>
        </div></div>
        );
    }
}

export default Register;

