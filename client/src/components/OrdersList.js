import React from 'react';
import { Alert, Button, Table ,Row,Col,Card,CardBody,Collapse,CardImg,CardText,CardTitle ,ListGroupItem} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';
import {AdminContext} from './AdminContext';
import axios from 'axios';
class OredersList extends React.Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    this.state = {collapse: false};
  }
   
  // toggle() {
  //   this.setState({ collapse: !this.state.collapse  });
  // }
  toggle=()=> {
    this.props.toggle(this.props.order);
  }
  
  render() {
      const order = this.props.order ;
    return (
        <AdminContext.Consumer>
        {({orders,setOredrs})=>(
            <>
            {
                <>
                    <tr key={order._id}  >
                        <td onClick={this.toggle} style={{cursor:'pointer'}} >  &#9660; {order.dateStamp} </td>
                        <td>{order.userFullName}</td>
                        <td>{order.phone}</td>
                        <td>{order.roomId}</td>
                        <td>{order.orderStatus}</td>

                        {order.orderStatus === 'Processing' && (<td> <Button onClick={()=>{
                            setOredrs(
                                orders.map(ord=> (ord._id === order._id )? {...ord,orderStatus:"Out For Delivery"}:ord)
                            );
                            axios
                            .put(`/api/orders/delivered/${order._id}`)
                            .then(res=> console.log("successfull"))
                        }} > Out For Delivery  </Button> </td>)}
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