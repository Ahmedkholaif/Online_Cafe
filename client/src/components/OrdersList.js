import React from 'react';
import { Alert, Button, Table ,Row,Col,Card,CardBody,Collapse ,ListGroupItem} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';
import {AdminContext} from './AdminContext';
class OredersList extends React.Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    this.state = {collapse: false};
  }
  
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  
  render() {
      const order = this.props.order ;
    return (
        <AdminContext.Consumer>
        {({orders,setOredrs})=>(
            <>
            {
                <>
                    <tr key={order.id}  >
                        <td onClick={this.toggle} >  &#9660; {order.dateStamp} </td>
                        <td>{order.userFullName}</td>
                        <td>{order.phone}</td>
                        <td>{order.roomId}</td>
                        <td>{order.orderStatus}</td>
                        <td> <Button onClick={()=>{
                            setOredrs(
                                orders.map(ord=> (ord.id === order.id && ord.orderStatus === 'Processing')? {...ord,orderStatus:"Out For Delivery"}:ord)
                            )
                        }} >Out For Delivery  </Button> </td>
                    </tr>
                        <tr>
                        <td colSpan="6" className="text-right ">
                <Collapse isOpen={this.state.collapse}>
                <Card>
                    <CardBody>
                        <Row>
                        {
                        order.orderBody.map(product=>
                            <Col xs='3'className="float-left text-center border border-info p-3" > 
                            <Row>
                            <Col xs='6' >
                                <Row className="text-center" >{product.productName }</Row>  
                                <Row className="text-center">{product.price }</Row>  
                                <Row className="text-center" >{product.quantity }</Row>  
                            </Col>
                            <Col xs='6' >
                            image
                            </Col>
                            </Row>
                            </Col>
            )
            }
    
            </Row>
        Order Total :{order.orderTotal} 
        </CardBody>
        </Card>
        </Collapse>
        </td>
        </tr>  
    </>
        }
          </>

        )}
       
      </AdminContext.Consumer>
    
      );
  }
}

export default OredersList ;