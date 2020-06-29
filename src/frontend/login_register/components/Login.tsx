import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import CSS from 'csstype';
import axios from 'axios';


interface LoginPageState {
    username: string,
    password: string,
    submitted: boolean
}

class Login extends Component<{}, LoginPageState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false
        };
    }

    // handleSubmit = (e: any) => {
    //     e.preventDefault();
    //     this.setState({ submitted: true });
    //     const { username, password } = this.state;
    //     if (username && password) {
    //         //TODO
    //     }
    // }

    render() {
        const { username, password, submitted } = this.state;
        const login_style: CSS.Properties = {
           paddingTop: "50px"
        };
        return (
            <div className="col-md-6 col-md-offset-3" style={login_style}>
            <h2>Login</h2>
            <form name="form" action="/api/v1/users/login" method="post" >
                <div className={'form-group' + (submitted && !username? ' has-error' : '')}>
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" name="username"/>
                    {submitted && !username &&
                        <div className="help-block">Please enter the username</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" />
                    {submitted && !password &&
                        <div className="help-block">Please enter the password</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" type="submit">Login</button>
                    <Link to="/register" className="btn btn-link">Register</Link>
                </div>
            </form>
        </div>
        );
    }
}

export default Login