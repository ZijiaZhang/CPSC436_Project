import React, {Component} from 'react'
import { Link, Redirect } from 'react-router-dom';
import CSS from 'csstype';


interface RegisterPageState {
    username: string, 
    password: string, 
    pwdConfirm: string,
}


class Register extends Component<{}, RegisterPageState> {
    constructor(props: any) {
        super(props);

        this.state = {
            username: '',
            password: '',
            pwdConfirm: '',
        };
    }

    render() {
        const register_style: CSS.Properties = {
            paddingTop: "50px"
         };
        return (
            <div className="col-md-6 col-md-offset-3" style={register_style}>
            <h2>Register</h2>
            <form name="form" action="/api/v1/users/register" method="post">
                <div className='form-group'>
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" name="username" />
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
            </form>
        </div>
        );
    }
}

export default Register;

