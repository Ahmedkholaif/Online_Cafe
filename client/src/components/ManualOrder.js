import React, { Component } from "react";
import { Container, Row, Col} from 'reactstrap';
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