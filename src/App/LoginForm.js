import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../redux/reducer';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleEmailChange = (event) => {
        const email = event.target.value;
        this.setState({
            email
        });
    }

    handlePasswordChange = (event) => {
        const password = event.target.value;
        this.setState({
            password
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        const { login } = this.props;
        login(email, password);

    }
    render() {
        // const { email, password } = this.state;
        const { isLoginPending, isLoginSuccessful, isLoginError } = this.props;
        return (
            <div>
                <h1>Login Form</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Email
                    <input type='text' name='email' onChange={this.handleEmailChange} />
                    </label>

                    <label>Password
                    <input type='password' name='password' onChange={this.handlePasswordChange} />
                    </label>
                    <button type='submit'>submit</button>
                </form>
                <div>{isLoginPending && <span>Please wait.....</span>}
                    {isLoginSuccessful && <span>Login Successful</span>}
                    {isLoginError && <span>Please provide correct details.</span>}
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        isLoginPending: state.loginPending,
        isLoginSuccessful: state.loginSuccessful,
        isLoginError: state.loginError
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => dispatch(login({ email, password }))
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);