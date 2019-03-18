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
                onChange={(e)=>{
                  console.log(e.target.value)
                  this.setState({
                    email:e.target.value
                  })
                }}
                placeholder="Email"/>
            </FormGroup>
            
            <Button
            color="secondary"
              type="submit"
            size="lg"
              onClick={ (e)=>{
                if(valid.isEmail(this.state.email)){
                  axios
                .get(`/api/users/forget/${this.state.email}`)
                .then(res=>{
                  console.log(this.state.email)
                  console.log(res);
                  if(res.status === 200)
                    alert("email sent")
                  else {
                    alert("Sorry Try Agian")
                  }
                })
                .catch(err=>{
                  console.log(err)
                  alert("Sorry Try Again..")})
                

                }else {
                  alert('Invalid Email..!')
                }
                
              }
              }>Send</Button> <hr/> <br/>
              <Link to="/"> Back to Login </Link>
          
          </Container>
      );
    }
  
  }
  export default ForgetPassword;