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
                        <td>{order.roomName}</td>
                        <td>{order.orderStatus}</td>

                        {order.orderStatus === 'Processing' && (<td> <Button onClick={()=>{
                            setOredrs(
                                orders.map(ord=> (ord._id === order._id )? {...ord,orderStatus:"Out For Delivery"}:ord)
                            );
                            axios
                            .put(`/api/orders/delivered/${order._id}`)
                            .then(res=> {
                              console.log("successfull")
                              setTimeout(()=>{
                                axios
                                .put(`/api/orders/out/${order._id}`)
                                .then(res=>{
                                  setOredrs(
                                    orders.map(ord=> (ord._id === order._id )? {...ord,orderStatus:"Deliverd"}:ord)
                                );
                                })
                              },5*60*1000);
                            })
                            .catch(err=>console.log(err))
                        }} > Out For Delivery  </Button> </td>)} {<td> </td>} 
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
                              <CardText>price: {product.price}</CardText>
                              <CardText>quantity: {product.quantity}</CardText>
                            </CardBody>
                            </Card>  
                            </Col>
                           
                            </Row>
                            </Col>
            )
            }
    
            </Row>
        Order Total :EGP {order.orderTotal} 
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