import React, { Component } from "react";
import { Container, Row, Col,Input,Button } from 'reactstrap';
//import '../css/ManualOrder.css';
import 'bootstrap/dist/css/bootstrap.css';
import OrderProducts from './OrderProducts';
import ProductsGallery from './ProductsGallery'

class ManualOrder extends Component{

  constructor(props){
    super(props);
    this.state={
     
    }
  }

//this is a callback function to be passed to
// UsersList  to get the value of selected item
// getSelecedUser(selectedUser)
// { 
//  //console.log(selectedUser+" getSelecedUser function");
//  var newOrder={...this.state.order}
//  newOrder.fullName=selectedUser

//  this.setState({ newOrder});


// }


    
render()
{
    return (
      

      
<Container >
  <Row className='p-2'>
    <Col xs="4" className="split left" id="rItem"   > 
         <OrderProducts /> 
    
    </Col>
    <Col xs="8" className="split right" id="lItem" >
    
    <ProductsGallery/>
              
    </Col>
  </Row>
  <br />
 
</Container>
        
      );
}

}



export default ManualOrder;