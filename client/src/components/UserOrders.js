import React from 'react';
import { Alert, Button, Table ,Row,Col,Card,CardBody,Collapse ,ListGroupItem} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';
import {AdminContext} from './AdminContext';
import OrdersList from './OrdersList';
import UserOrdersView from './UserOrdersView';
import moment from 'moment' ;
import _ from 'lodash';
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

  filterAndSortOrders=(orders)=> {

    let sortedOrders = _.orderBy(orders, (order) => {
        return moment(order.dateStamp)
      }, ['desc']);
    if(this.state.dateFrom !=='' && this.state.dateTo !== '') {
        console.log('two');
        return sortedOrders.filter(order=>
            moment(order.dateStamp).isBetween(this.state.dateFrom, this.state.dateTo));
    }else if (this.state.dateFrom !== '') {
        console.log('from');

        return sortedOrders.filter(order=>
            moment(order.dateStamp).isBetween(this.state.dateFrom, moment()))

    }else if (this.state.dateTo !== ''){
        console.log('to');

        return sortedOrders.filter(order=>
            moment(order.dateStamp).isBetween(moment('2010-01-01'),this.state.dateTo))
    }
    else {
        console.log('none');

        console.log(sortedOrders);
        return sortedOrders;
    }
}
  
  render() {
      const user = this.props.user ;
    return (
        <AdminContext.Consumer>
        {({users,orders})=>{
           const filterdOrders = this.filterAndSortOrders(orders);
        return  (
            <>
            { 
                <>
                    <tr key={user.userFullName}  >
                        <td onClick={this.toggle} style={{cursor:'pointer'}} >  &#9660; {user.fullName} </td>
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
    )
        }}
       
      </AdminContext.Consumer>
    
      );
  }
}

export default UserOrders ;