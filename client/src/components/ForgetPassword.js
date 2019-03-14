import React, {Componant} from 'react';
import '../css/ForgetPassword.css';


class ForgetPassword extends React.Component {

    constructor(props) {
      super(props);
      this.state = {};
    }
  
    submitSendEmail(e) {}
  
    render() {
      return (
        <div className="inner-container">
          <div className="header">
            Write your email
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
              onClick={this
              .submitSendEmail
              .bind(this)}>Send</button>
          </div>
        </div>
      );
    }
  
  }
  export default ForgetPassword;