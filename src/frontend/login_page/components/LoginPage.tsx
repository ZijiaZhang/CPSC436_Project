import * as React from "react";
import { Link } from 'react-router-dom';
import CSS from 'csstype';

export interface LoginPageState {
    username: string,
    password: string,
    submitted: boolean
}

interface LoginPageProp {

}

class LoginPage extends React.Component <{}, LoginPageState>{
    constructor(props: {}) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e: any) => {
        const { name, value } = e.target;
        this.setState({ [name]: value } as Pick<LoginPageState, keyof LoginPageState>);
    }

    handleSubmit = (e: any) => {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            // this.props.login(username, password);
        }
    }

    render() {
        // const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        const login_style: CSS.Properties = {
           paddingTop: "50px"
        };
        return (
            <div className="col-md-6 col-md-offset-3" style={login_style}>
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username? ' has-error' : '')}>
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
                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>
                        {/* {loggingIn &&
                            <img src="" />
                        } */}
                        <Link to="/registerPage" className="btn btn-link">Register</Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginPage;
