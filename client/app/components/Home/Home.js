import React, { Component } from 'react';
import 'whatwg-fetch';
// import { spawn } from 'child_process';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
      isSignIn: true,
      isSignUp: false
    };

    // this.newCounter = this.newCounter.bind(this);
    // this.incrementCounter = this.incrementCounter.bind(this);
    // this.decrementCounter = this.decrementCounter.bind(this);
    // this.deleteCounter = this.deleteCounter.bind(this);

    // this._modifyCounter = this._modifyCounter.bind(this);
  }

  componentDidMount() {
    // fetch('/api/counters')
    //   .then(res => res.json())
    //   .then(json => {
    //     this.setState({
    //       counters: json
    //     });
    //   });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { signInEmail, signInPassword } = this.state;
    fetch('api/account/signin', {
      email: signInEmail,
      password: signInPassword
    }).then((res) => {
      console.log('responet', res);
    });
  }

  handleSignUpSubmit = (event) => {
    event.preventDefault();
    const { signUpEmail, signUpPassword } = this.state;
    fetch('api/account/signup', {
      email: signUpEmail,
      password: signUpPassword
    }).then((res) => {
      console.log('responet', res);
    });
  }

  setFormState = (formState) => (ev) => {
    switch(formState){
      case 'isSignIn': 
      this.setState({
        isSignIn: true,
        isSignUp: false
      })
      case 'isSignUp': 
      this.setState({
        isSignIn: false,
        isSignUp: true
      })
    }
  } 

  handleSignInChange = (field) => (event) => {
    switch(field){
      case 'signInEmail': 
      const signInEmail = event.target.value
      this.setState({
        signInEmail
      })
      case 'signInPassword': 
      const signInPassword = event.target.value
      this.setState({
        signInPassword
      })
    }
  } 

  handleSignUpChange = (field) => (event) => {
    switch(field){
      case 'signUpEmail': 
      const signUpEmail = event.target.value
      this.setState({
        signUpEmail
      })
      case 'signUpPassword': 
      const signUpPassword = event.target.value
      this.setState({
        signUpPassword
      })
    }
  } 

  render() {
    const { signInError, signInEmail,  signInPassword, isSignIn, isSignUp }  = this.state;
    return (
      <>
        {/* <p>Counters:</p>

        <ul>
          { this.state.counters.map((counter, i) => (
            <li key={i}>
              <span>{counter.count} </span>
              <button onClick={() => this.incrementCounter(i)}>+</button>
              <button onClick={() => this.decrementCounter(i)}>-</button>
              <button onClick={() => this.deleteCounter(i)}>x</button>
            </li>
          )) }
        </ul> */}

        {/* <button onClick={this.newCounter}>New counter</button> */}

        {/* Sign In */}
        <button onClick={this.setFormState('isSignIn')}>
          SignIn
        </button>
        <button onClick={this.setFormState('isSignUp')}>
          Sign Up
        </button>
        {isSignIn && 
         <div>
          <h3>Sign In Form</h3>
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <label> Username
                <input type='text' onChange={this.handleSignInChange('signUpEmail')} value={signInEmail} />
              </label>

              <label> Password
                <input type='password'  onChange={this.handleSignInChange('signUpPassword')} value={signInPassword} />
              </label>
              <button type='submit' onClick={this.handleSubmit}>
                Submit
              </button>
            </fieldset>
          </form>
          {signInError && <span>There is some Login Error.</span>}
       </div>
        }
        {isSignUp && 
         <div>
          <h3>Sign In Form</h3>
          <form onSubmit={this.handleSignUpSubmit}>
            <fieldset>
              <label> Username
                <input type='text' onChange={this.handleSignUpChange('signUpEmail')} value={signUpEmail} />
              </label>

              <label> Password
                <input type='password'  onChange={this.handleSignUpChange('signUpPassword')} value={signUpPassword} />
              </label>
              <button type='submit' onClick={this.handleSignUpSubmit}>
                Submit
              </button>
            </fieldset>
          </form>
          {signInError && <span>There is some Login Error.</span>}
       </div>
        }
      </>
    );
  }
}

export default Home;
