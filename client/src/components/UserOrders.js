import React from 'react';
import { Alert, Button, Table ,Row,Col,Card,CardBody,Collapse ,ListGroupItem} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';
import {AdminContext} from './AdminContext';
import OrdersList from './OrdersList';
import UserOrdersView from './UserOrdersView';
class UserOrders extends React.Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    this.state = {collapse: false};
  }
   
  toggle(orders) {
    this.setState({ collapse: this.state.collapse === orders ? null : orders });

  }

  toggle =()=>{
    this.props.toggle(this.props.user);

  }
  
  render() {
      const user = this.props.user ;
    return (
        <AdminContext.Consumer>
        {({users,orders})=>(
            <>
            { 
                <>
                    <tr key={user.userFullName}  >
                        <td onClick={this.toggle} >  &#9660; {user.fullName} </td>
                        <td>{
                            orders.filter(order=> order.userFullName === user.fullName)
                            .reduce((acc,ord)=>(acc + ord.orderTotal ),0)
                        }</td>
                    </tr>
                                    <tr>
                        <td colSpan="6" className="text-right ">
                <Collapse isOpen={this.props.isOpen}>
                <Card>
                    <CardBody>
                        <Row>
                        <UserOrdersView 
                        orders={ orders.filter(order=> order.userFullName === user.fullName) } 
                         />
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

export default UserOrders ;