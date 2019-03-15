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
                        <td onClick={this.toggle} >  &#9660; {order.dateStamp} </td>
                        <td>{order.roomId}</td>
                        <td>{order.orderTotal}</td>
                        <td>{order.orderStatus}</td>
                        
                        <td> <Button onClick={()=>{
                            if(order.orderStatus === 'Processing') {
                                if(window.confirm('Are You Sure ..?'))
                                setMyOrders(
                                    myOrders.filter(ord=> ord.id !== order.id )
                                )
                            } else {
                                window.alert("You Can't Cancel")
                            }
                          
                        }} > Cancel  </Button> </td>
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
                            <CardImg top width="100%"  src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
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