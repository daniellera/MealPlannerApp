import { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addToken, addUser } from "../../Redux/actionCreators";
import { baseUrl } from "../../Shared/baseUrl";
import axios from "axios";
import "./Login.css";
import image from "../../images/top_with_photos_(phone).png";
import LoginPhoto from "../../images/Login.png";

const mapDispatchToProps = (dispatch) => ({
  addToken: () => dispatch(addToken()),
  addUser: () => dispatch(addUser()),
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleLogin = async () => {
    const data = {
      username: this.state.username,
      password: this.state.password,
    };

    const userWithToken = await axios.post(baseUrl + "/login", data);

    await this.props.dispatch(addToken(userWithToken.data.token));
    await this.props.dispatch(addUser(userWithToken.data.user));
  };

  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div className="LoginContainer">
        <img alt="image of food" src={image} className="eggs" />
        {/* <h1>Please Sign In</h1> */}
        <img alt="login" src={LoginPhoto} className="login" />
        <div className="something">
        <label class="sr-only">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          className="form-control"
          placeholder="Username"
          v-model="user.username"
          onChange={this.handleInputChange}
          required
        />
        </div>
        <div className="something">
        <label class="sr-only">Password</label>
        <input
          type="password"
          id="password"
          nameName="password"
          class="form-control"
          placeholder="Password"
          v-model="user.password"
          onChange={this.handleInputChange}
          required
        />
        </div>
        {/* <Link to="/register">Need an account?</Link> */}
       <div className="something"> <button type="submit" className = "loginButton" onClick={this.handleLogin}>
          Sign in
        </button>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapDispatchToProps)(Login));
