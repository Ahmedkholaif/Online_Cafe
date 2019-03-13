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
    order : {
            id:'',
            userFullName :'',
            notes:'',
            orderTotal:'',
            orderStatus:'', 
            dateStamp:'',
            roomId:'',
            orderBody:[{
                productName:'',
                price:'',
                quantity:'',
            }]
        }
   
}    
    toggle=()=> {
        this.setState({
            collapse: !this.state.collapse,
        }); 
    }
    toggle =(product) =>{
        this.setState(prevState => ({
            collapse: !prevState.collapse,
            product,
            inEdit: product,
        }));
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
                    <th>  Name </th>
                    <th> Phone</th>
                    <th> Room </th>
                    <th> Status </th>
                    <th>##</th>
                    
                </tr>
            </thead>
            <tbody>

                {
                    Object.keys(orders).map((key, index) =>
                    <OrdersList key={index} order={orders[key]} />
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