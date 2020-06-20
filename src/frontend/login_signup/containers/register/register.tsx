import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import CSS from 'csstype';
import {connect} from 'react-redux'
import {register} from '../../redux/UserRedux'


interface RegisterPageState {
    user: {
        firstname: string,
        lastname: string,
        username: string,
        password: string
    },
    submitted: boolean
}

class Register extends Component<{}, RegisterPageState> {
    constructor(props: any) {
        super(props);

        this.state = {
            user: {
                firstname: '',
                lastname: '',
                username: '',
                password: ''
            },
            submitted: false
        };
    }

    handleChange = (e: any) => {
        const { name, value } = e.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit = (e: any) => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.firstname && user.lastname && user.username && user.password) {
            // TODO
        }
    }

    render() {
        const { user, submitted } = this.state;
        const register_style: CSS.Properties = {
            paddingTop: "20px"
         };
        return (
            <div className="col-md-6 col-md-offset-3" style={register_style}>
            <h2>Register</h2>
            <form name="form" onSubmit={this.handleSubmit} style={register_style}>
                <div className={'form-group' + (submitted && !user.firstname ? ' has-error' : '')}>
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" className="form-control" name="firstname" value={user.firstname} onChange={this.handleChange} />
                    {submitted && !user.firstname &&
                        <div className="help-block">Please enter the first name</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !user.lastname ? ' has-error' : '')}>
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" className="form-control" name="lastname" value={user.lastname} onChange={this.handleChange} />
                    {submitted && !user.lastname &&
                        <div className="help-block">Please enter the last name</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
                    {submitted && !user.username &&
                        <div className="help-block">Please enter the username</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                    {submitted && !user.password &&
                        <div className="help-block">Please enter the password</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" onSubmit={this.handleSubmit}>Register</button>
                    <Link to="/" className="btn btn-link">Cancel</Link>
                </div>
            </form>
        </div>
        );
    }
}

export default Register;