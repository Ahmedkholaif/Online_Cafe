import React from 'react';
import { Alert, Button, Table ,Row,Col,Card,CardBody,Collapse,CardImg,CardText,CardTitle ,ListGroupItem} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';
import {UserContext} from './UserContext';
class MyOredersList extends React.Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    this.state = {collapse: false};
  }
   
  toggle=()=> {
    this.props.toggle(this.props.order);
  }
  
  render() {
      const order = this.props.order ;
    return (
        <UserContext.Consumer>
        {({myOrders,setMyOrders})=>(
            <>
            {
                <>
                    <tr key={order.id}  >
                        <td onClick={this.toggle} style={{cursor:'pointer'}} >  &#9660; {order.dateStamp} </td>
                        <td>{order.roomName}</td>
                        <td>{order.orderTotal}</td>
                        <td>{order.orderStatus}</td>
                        

                        {order.orderStatus === 'Processing' && (
                          <td> 
                          <Button onClick={()=>{
                            if(order.orderStatus === 'Processing') {
                                if(window.confirm('Are You Sure ..?'))
                                setMyOrders(
                                    myOrders.filter(ord=> ord.id !== order.id )
                                )
                            } 
                          
                        }} > Cancel  </Button> </td>

                        )} {<td> </td>} 
                        
                    </tr>
                        <tr>
                        <td colSpan="6" className="text-right ">
                <Collapse isOpen={this.props.isOpen}>
                <Card>
                    <CardBody>
                        <Row>
                        {
                        order.orderBody.map(product=>
                            <Col xs='3'className="float-left text-center border border-info p-3" > 
                            <Row>
                            <Col >
                            <Card >
                            <CardImg top width="100%"  src={product.image} alt="Card image cap" />
                            <CardBody  >
                              <CardTitle >{product.productName}</CardTitle>
                              <CardText>{product.price}</CardText>
                              <CardText>{product.quantity}</CardText>
                            </CardBody>
                            </Card>  
                            </Col>
                           
                            </Row>
                            </Col>
            )
            }
    
            </Row>
        </CardBody>
        </Card>
        </Collapse>
        </td>
        </tr>  
    </>
        }
          </>

        )}
       
      </UserContext.Consumer>
    
      );
  }
}

export default MyOredersList ;