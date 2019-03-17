import React, {Component} from 'react';
import {  Button, FormGroup,Input } from 'reactstrap';
import propTypes from "prop-types";
import '../css/LoginForm.css'
import axios from 'axios';
import validator from 'validator';
// import './assets/css/fonts.css';
import {Link} from'react-router-dom';
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {
				email: "",
				password: ""
            },
            error:'',
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;

		const { userData } = this.state;

        this.setState({
            userData : { ...userData, [name]: value }
        });
            
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.handleLoginOpertion();
    }

    validateForm =()=> {
        return this.state.userData.email.length > 0 && 
        validator.isEmail(this.state.userData.email) &&
        this.state.userData.password.length > 6 ;
    }

    handleLoginOpertion = ()=> {
      
        const { userData } = this.state;
        console.log(userData);

        if(this.validateForm()) {
            axios
            .post("/api/users/login",userData )
        .then(res => {
            console.log(res);
            if(res.status === 200){
                
                if(res.data.isAdmin) {
                    sessionStorage.isAdmin =res.data.isAdmin ;
                    this.props.history.push('/home');

                }else if (res.data) {
                    sessionStorage.userFullName=res.data.fullName;
                    sessionStorage.useremail=res.data.email;
                    sessionStorage.phone=res.data.phone;
                    this.props.history.push('/admin/dashboard');
                }else {
                    this.setState({
                        error:"Invalid Login Data"
                    })

                }
            } 
            }
        )
        .catch(error => console.log({error}))
        } else {
            this.setState({
                error:"Invalid Login Data"
            })

        }
        
    }


    render() {
        return (
            <div className='AdminLogin'>
            
                <h1 > Online Cafe  </h1>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Input required type="email" name="email" id="Email" placeholder="email" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Input required type="password" name="password" id="Password" placeholder="Password" onChange={this.handleChange} />
                    </FormGroup>
                    {this.state.error && (
                        <span className="text-danger"> {this.state.error} </span>
                      )}{" "}
                    <Button color='primary' size='lg' block type="submit">Login</Button>
                </form><hr/><br/>
             <Link to="/forget">Forget My Password </Link>   
             <Link to="/admin/dashboard">Admin </Link>   
            </div>
        );
    }
}

LoginForm.propTypes = {
    submit: propTypes.func.isRequired,
    isUserExists: propTypes.func.isRequired,
  
    users: propTypes.arrayOf(
      propTypes.shape({
        email: propTypes.string.isRequired
      }).isRequired
    ),
  
    history: propTypes.shape({
      push: propTypes.func.isRequired
    }).isRequired
  };
export default LoginForm;