import React, {Componant} from 'react';
import '../css/ForgetPassword.css';
import axios from 'axios';
import valid from 'validator';
import {Link} from 'react-router-dom'
class ForgetPassword extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        email:''
      };
    }
  
  
    render() {
      return (
        <div className="inner-container">
          <div className="header">
          </div>
          <div className="box">
  
            <div className="input-group">
              <label htmlFor="username">Email</label>
              <input
                type="email"
                name="email"
                className="login-input"
                placeholder="Email"/>
            </div>
  
      
  
            <button
              type="button"
              className="login-btn"
              onClick={ (e)=>{
                if(valid.isEmail){
                  axios
                .post(`/api/users/forget/${e.target.value}`)
                .then(res=>{
                    alert("email sent")
                })
                }
                
              }
              }>Send</button> <hr/> <br/>
              <Link to="/"> Back to Login </Link>
          </div>
        </div>
      );
    }
  
  }
  export default ForgetPassword;