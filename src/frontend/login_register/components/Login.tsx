import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import CSS from 'csstype';


interface LoginPageState {
    username: string,
    password: string,
}

class Login extends Component<{}, LoginPageState> {
    constructor(props: {}) {
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
            </form>
        </div>
        );
    }
}

export default Login