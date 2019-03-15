import React, { Component } from 'react';
import axios from "axios";
import { Alert, Button, Table,Container ,Row,Col,Card,CardBody,Collapse ,ListGroupItem} from "reactstrap";
import AddProduct from './AddProduct';
import { Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Redirect } from 'react-router-dom'
import {AdminContext} from './AdminContext';
import OrdersList from './OrdersList';
class OrdersView extends Component {

state = {
    collapse:false,
   
}    
    toggle=()=> {
        this.setState({
            collapse: !this.state.collapse,
        }); 
    }
    // toggle =(product) =>{
    //     this.setState(prevState => ({
    //         collapse: !prevState.collapse,
    //         product,
    //         inEdit: product,
    //     }));
    // }

    toggle=(order)=> {
        this.setState({ collapse: this.state.collapse === order ? null : order });
    }


    componentDidMount() {

    }


    // handleOnChange = (event) => {

    //     this.setState({
    //        inEdit: {...this.state.inEdit, [event.target.name] : event.target.value } 
    //     })
    //     console.log(this.state.inEdit)
    // }

    // handleOnChangeBox = (event) => {
    //     this.setState({
    //         inEdit: {...this.state.inEdit, [event.target.name] : event.target.checked } 
    //     });
    //     console.log(this.state.inEdit)
    // }

    // handleselectedFile = event => {
    //     this.setState({
    //         selectedFile: event.target.files[0],
    //         loaded: 0
    //     });
    // };

    render() {
        return (
            <AdminContext.Consumer>

            {
                 ({ orders ,setOrders,categories }) => (
                    <Container >
                    <Table className="table-striped mt-5">
            <thead>
                <tr>
                    <th> Order Date </th>
                    <td> Name </td>
                    <td>Phone</td>
                    <td>room</td>
                    <td>Order Status </td>
                    <td>## </td>
                </tr>
            </thead>
            <tbody>

                {
                    Object.keys(orders).map((key, index) =>
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