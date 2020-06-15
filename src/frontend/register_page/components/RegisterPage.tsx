import * as React from "react";
import { Link } from 'react-router-dom';
import CSS from 'csstype';


export interface RegisterPageState {
    user: {
        firstname: string,
        lastname: string,
        username: string,
        password: string
    },
    submitted: boolean
}


class RegisterPage extends React.Component <{}, RegisterPageState>{
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

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            // this.props.register(user);
        }
    }

    render() {
        // const { registering  } = this.props;
        const { user, submitted } = this.state;
        const register_style: CSS.Properties = {
            paddingTop: "20px"
         };
        return (
            <div className="col-md-6 col-md-offset-3" style={register_style}>
            <h2>Register</h2>
            <form name="form" onSubmit={this.handleSubmit} style={register_style}>
                <div className={'form-group' + (submitted && !user.firstname ? ' has-error' : '')}>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" className="form-control" name="firstName" value={user.firstname} onChange={this.handleChange} />
                    {submitted && !user.firstname &&
                        <div className="help-block">Please enter the first name</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !user.lastname ? ' has-error' : '')}>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" className="form-control" name="lastName" value={user.lastname} onChange={this.handleChange} />
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
                    <button className="btn btn-primary">Register</button>
                    {/* {registering && 
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    } */}
                    <Link to="/" className="btn btn-link">Cancel</Link>
                </div>
            </form>
        </div>
        );
    }
}

export default RegisterPage;