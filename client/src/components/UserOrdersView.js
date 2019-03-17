import React, { Component } from 'react';
import axios from "axios";
import { Alert, Button, Table,Container ,Row,Col,Card,CardBody,Collapse ,ListGroupItem} from "reactstrap";
import AddProduct from './AddProduct';
import { Input, Modal, ModalBody, ModalFooter, ModalHeader,Pagination,PaginationItem,PaginationLink } from "reactstrap";
import { Redirect } from 'react-router-dom'
import {AdminContext} from './AdminContext';
import UserOrdersList from './UserOrdersList';
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
        const orders = this.props.orders ;
        return (
          <>
                    <Container >
                    <Table className="table-striped mt-5">
            <thead className="bg-secondary rounded">
                <tr>
                    <th> Order Date </th>
                    <th>  Amount  </th>
                    <th>##</th>
                </tr>
            </thead>
            <tbody>
                {
                    Object.keys(orders).map((key, index) =>
                    <UserOrdersList key={index} order={orders[key]}
                    isOpen={this.state.collapse === orders[key]}
                    toggle={this.toggle}
                    />
                )
                }
                

             </tbody>
             </Table>
             </Container>
    
      </>
        );
    }
}

export default OrdersView ;