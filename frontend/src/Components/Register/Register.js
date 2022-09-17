import axios from 'axios'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import { baseUrl } from '../../Shared/baseUrl'
import './Register.css'
import logo from '../../images/logo.png'

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: ''
        }

    }

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
        const data = { username: this.state.username, password: this.state.password, confirmPassword: this.state.confirmPassword, role: 'USER' }
        if (this.state.password === this.state.confirmPassword) {
            axios.post(baseUrl + "/register", data)
        } else {
            alert("Password and Confirm Password must match!!!")
        }
    }

    render() {
        return (
            <div className="register-container">
                <img src={logo} alt="Logo image" />
                <h1>Create Account</h1>
                <div className='something'>
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
                <div className='something'>
                    <label class="sr-only">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        v-model="user.password"
                        onChange={this.handleInputChange}
                        required
                    />
                </div>
                <div className='something'>
                    <input
                        type="password"
                        id="password-confirm"
                        name="confirmPassword"
                        className="form-control"
                        placeholder="Confirm Password"
                        v-model="user.password"
                        onChange={this.handleInputChange}
                        required
                    />
                </div>
                <div className="something">
                    <button className="loginButton" type="submit" onClick={this.handleSubmit}>Submit</button>
                </div>
                <Link className="something" to="/login">Have an account?</Link>
            </div>
        )
    }
}

export default Register;