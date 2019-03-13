import React, { Component } from 'react';
import axios from "axios";
import { Alert, Button, Table ,Row,Col} from "reactstrap";
import AddProduct from './AddProduct';
import { Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Redirect } from 'react-router-dom'
import {AdminContext} from './AdminContext';
class OrdersView extends Component {

state = {
    modal:false,
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
            modal: !this.state.modal,
        }); 
    }
    toggle =(product) =>{
        this.setState(prevState => ({
            modal: !prevState.modal,
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
            
            { ({ orders ,setOrders,categories }) => (
                
                <Row>
                <Table>
                <thead>
                    <tr>
                        <th> Order Date </th>
                        <th>  Name </th>
                        <th> Phone</th>
                        <th> Room </th>
                        <th> Status </th>
                        <th>#</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                {
                orders.map(order => 
                    <>
                        <tr key={order.id} >
                            <td>{order.dateStamp}</td>
                            <td>{order.userFullName}</td>
                            <td>{order.phone}</td>
                            <td>{order.roomId}</td>
                            <td>{order.orderStatus}</td>
                        </tr>  
                        <tr>
                           <Row>
                           {
                            order.orderBody.map(product=>
                                <Col xs="6"> 
                               <Row>{product.productName }</Row>  
                               <Row>{product.price }</Row>  
                               <Row>{product.quantity }</Row>  
                                </Col>
                            )
                           }
                           </Row>
                           {order.orderTotal} 
                        </tr>
                        </>  
                )}   
                </tbody>
            </Table>
                </Row>
            )}
            </AdminContext.Consumer>
        );
    }
}

export default OrdersView ;