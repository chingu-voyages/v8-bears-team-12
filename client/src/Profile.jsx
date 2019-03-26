import React, { useState } from 'react';

// first write it as class then refactor using React hook

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      zipcode: '',
      interests: [],
      dietRestrictions: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <br></br>
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </label>
          <br></br>
          <label>
            Password:
            <input
              type="text"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <br></br>
          <label>
            Zipcode:
            <input
              type="text"
              name="zipcode"
              value={this.state.zipcode}
              onChange={this.handleChange}
            />
          </label>
          <br></br>
          <label>
            Interests:
            <input
              type="text"
              name="interests"
              value={this.state.interests}
              onChange={this.handleChange}
            />
          </label>
          <br></br>
          <label>
            Diet Restrictions:
            <input
              type="text"
              name="dietRestrictions"
              value={this.state.dietRestrictions}
              onChange={this.handleChange}
            />
          </label>
          <br></br>
          <button type="button">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Profile;
