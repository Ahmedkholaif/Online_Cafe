import React, { Component } from "react";
import { Container, Row, Col} from 'reactstrap';
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
<Row className="ml-0 col-12">
    <Col xs="4" className="ml-0"  > 
      <OrderProducts /> 
    </Col>
    <Col xs="8" className="mr-0"  >
    <ProductsGallery/>
    </Col>
    </Row>
);}
}



export default ManualOrder;