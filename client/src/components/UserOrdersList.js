import React from 'react';
import { Alert, Button,Row,Col,Card,Collapse,
   Input,Table ,Container,Pagination,PaginationItem,
   PaginationLink ,CardTitle,CardBody,CardImg,CardText} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';
import {AdminContext} from './AdminContext';
class UserOrdersList extends React.Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    this.state = {collapse: false};
  }
    
  toggle=()=> {
    this.props.toggle(this.props.order);
  }
  // toggle() {
  //   this.setState({ collapse: !this.state.collapse });
  // }
  
  render() {
      const order = this.props.order ;
    return (
        <AdminContext.Consumer>
        {({orders,setOredrs})=>(
            <>
            {
                <>
                    <tr key={order.id} id={orders.indexOf(order)+1} >
                        <td onClick={this.toggle} style={{cursor:'pointer'}} >  &#9660; {order.dateStamp} </td>
                        <td> {order.orderTotal}</td>
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
                            <Col  >
                            <Card >
                            <CardImg top width="100%"  src={product.image} alt="Card image " />
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
       
      </AdminContext.Consumer>
    
      );
  }
}

export default UserOrdersList ;