import React, {Componant} from 'react';
import '../css/ForgetPassword.css';
import axios from 'axios';
import valid from 'validator';
import {Link} from 'react-router-dom'
import {Container,FormGroup,Button,Input} from 'reactstrap';
class ForgetPassword extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        email:''
      };
    }
  
  
    render() {
      return (
        <Container className="col-4 mt-5 text-center">
         
            <FormGroup >
              <Input
                type="email"
                name="email"
                className="text-center"
                placeholder="Email"/>
            </FormGroup>
            
            <Button
            color="secondary"
              type="submit"
            size="lg"
              onClick={ (e)=>{
                if(valid.isEmail){
                  axios
                .post(`/api/users/forget/${e.target.value}`)
                .then(res=>{
                    alert("email sent")
                })
                }
                
              }
              }>Send</Button> <hr/> <br/>
              <Link to="/"> Back to Login </Link>
          
          </Container>
      );
    }
  
  }
  export default ForgetPassword;