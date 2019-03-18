import React, { Component } from 'react';

import {  Table,Container ,Row,Col} from "reactstrap";

import {AdminContext} from './AdminContext';
import OrdersList from './OrdersList';
import _ from 'lodash'
import moment from 'moment'
class OrdersView extends Component {

state = {
    collapse:false,
   
}    
    toggle=()=> {
        this.setState({
            collapse: !this.state.collapse,
        }); 
    }

    toggle=(order)=> {
        this.setState({ collapse: this.state.collapse === order ? null : order });
    }

    render() {
        return (
            <AdminContext.Consumer>

            {
                 ({ orders ,setOrders,categories }) => (
                    
                    <Container >
                    <Table className="table-striped mt-5">
            <thead className="bg-secondary rounded">
                <tr>
                    <th> Order Date </th>
                    <th> Name </th>
                    <th>Phone</th>
                    <th>room</th>
                    <th>Order Status </th>
                    <th>## </th>
                </tr>
            </thead>
            <tbody>

                {
                    Object.keys(
                        _.orderBy(orders, (order) => {
                            return moment(order.dateStamp)
                          }, ['desc'])
                    ).map((key, index) =>
                    <OrdersList
                     key={index} 
                     order={orders[key]}
                     isOpen={this.state.collapse === orders[key]}
                    toggle={this.toggle}
                     />
                )
                }
                

             </tbody>
             </Table>
             </Container>

            )}
            </AdminContext.Consumer>
        );
    }
}

export default OrdersView ;