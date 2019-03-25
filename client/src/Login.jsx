import React, { Component } from "react";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    console.log(user);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className="login">
        <h1>Log In</h1>
        <form action="" onSubmit={this.onSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={this.state.email}
            onChange={this.onChange}
          />
          <input
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default Login;
