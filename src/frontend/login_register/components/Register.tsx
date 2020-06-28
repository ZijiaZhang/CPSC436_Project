import React, {Component} from 'react'
import { Link, Redirect } from 'react-router-dom';
import CSS from 'csstype';
import axios from 'axios'


interface RegisterPageState {
    username: string, 
    password: string, 
    pwdConfirm: string,
    submitted: boolean,
}


class Register extends Component<{}, RegisterPageState> {
    constructor(props: any) {
        super(props);

        this.state = {
            username: '',
            password: '',
            pwdConfirm: '',
            submitted: false,
        };
    }

    handleChange = (e: any) => {
        const { name, value } = e.target;
        this.setState({ [name]: value } as RegisterPageState);
    }

    handleSubmit = (e: any) => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { username, password, pwdConfirm } = this.state;
        if (password !== pwdConfirm) {
            alert("Password is not the same as password confirmed!")
        }
        if (username && password && pwdConfirm && password === pwdConfirm) {
            axios.post("http://localhost:3000/api/v1/users/register", {
                username: username,
                password: password
            })
        }
    }

    render() {
        const { username,password, pwdConfirm, submitted } = this.state;
        const register_style: CSS.Properties = {
            paddingTop: "50px"
         };
        return (
            <div className="col-md-6 col-md-offset-3" style={register_style}>
            <h2>Register</h2>
            <form name="form" onSubmit={this.handleSubmit}>
                <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                    {submitted && !username &&
                        <div className="help-block">Please enter the username</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                    {submitted && !password &&
                        <div className="help-block">Please enter the password</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !pwdConfirm ? ' has-error' : '')}>
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" className="form-control" name="pwdConfirm" value={pwdConfirm} onChange={this.handleChange} />
                    {submitted && !pwdConfirm &&
                        <div className="help-block">Please enter the password again</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" onSubmit={this.handleSubmit}>Register</button>
                    <Link to="/login" className="btn btn-link">Cancel</Link>
                </div>
            </form>
        </div>
        );
    }
}

export default Register;

