import React, { Component } from 'react';
import axios from "axios";
import { Alert, Button, Table } from "reactstrap";
import AddProduct from './AddProduct';
import { Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Redirect } from 'react-router-dom'
import {AdminContext} from './AdminContext';
class ProductsView extends Component {

state = {
    modal:false,
    product : {
        productName:'',
        price:'',
        categoryName:'',
        isAvailable: true,
        image:'',
    },
    selectedFile: null,
    loaded: 0,
    inEdit:{},
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

    handleDeleteBook = deletedId => {
        const token = localStorage.token;
        if (token) {
            const conf = {
                headers: {
                    "x-auth": token,
                }

            }
            axios.delete(`/api/admin/books/${deletedId}`, conf)
                .then(res => {
                    if (res.status === 200) {
                        console.log(res);
                    } else {
                        console.log("not deleted from db");
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            this.setState({ error: 'Error Delete Operation' })
        }
        this.setState({ books: this.state.books.filter(book => book._id !== deletedId) });
    }

    handleOnChange = (event) => {

        this.setState({
           inEdit: {...this.state.inEdit, [event.target.name] : event.target.value } 
        })
        console.log(this.state.inEdit)
    }

    handleOnChangeBox = (event) => {
        this.setState({
            inEdit: {...this.state.inEdit, [event.target.name] : event.target.checked } 
        });
        console.log(this.state.inEdit)
    }

    handleselectedFile = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0
        });
    };

    render() {

        return (
            <AdminContext.Consumer>
            
            { ({ products ,setProducts,categories }) => (
                
                <div>
                <AddProduct />
                    <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop}
                        className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Add Product </ModalHeader>
                        <ModalBody>
                            <Input type="text" name="productName" defaultValue={this.state.product.productName} 
                                onChange={this.handleOnChange}
                                placeholder='Product Name' />
                            <Input type="select" name="categoryName" defaultValue={this.state.product.categoryName}
                                id="categorySelect" onClick={this.handleOnChange}>
                                <option  >{this.state.inEdit.categoryName}</option>
                                {
                                    categories.map(category =>
                                            <option key={category._id} defaultValue={category.categoryName}>{category.categoryName}</option>
                                    )
                                }
                            </Input>
                            <Input placeholder='Price' type="text" name="price" defaultValue={this.state.product.price} onChange={this.handleOnChange} >
                            </Input>
                            <hr/>
                            <Input type="checkbox" name="isAvailable" id="isAvailable" checked={this.state.inEdit.isAvailable} onChange={this.handleOnChangeBox} >
                            Available
                            </Input>
                            <Input type="text" name="image"  onChange={this.handleOnChange} placeholder="image" defaultValue={this.state.product.image} />
                            <Input
                                type="file"
                                name=""
                                onChange={this.handleselectedFile}
                                placeholder='Product Photo ' />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={()=>{
                                        setProducts(
                                            products.map(product => product._id === this.state.inEdit._id ?
                                                    this.state.inEdit :  product 
                                        ))
                                        this.setState({
                                            modal: ! this.state.modal,
                                            inEdit:{},
                                            product:{
                                                id:'',
                                                productName:'',
                                                price:0,
                                                categoryName:'',
                                                isAvailable: "",
                                                image:'',
                                            }
                                        });
                                
                            }}> Edit Product </Button>{' '}
                            <Button color="secondary" onClick={() => {
                                this.setState({
                                    modal : ! this.state.modal,
                                    inEdit:{},
                                    product:{
                                        id:'',
                                        productName:'',
                                        price:0,
                                        categoryName:'',
                                        isAvailable: "",
                                        image:'',
                                    }
                                })
                            }}>Close</Button>
                        </ModalFooter>
                    </Modal>
                
                   
                   
                    <Table>
                        <thead>
                            <tr>
                                <th> Photo</th>
                                <th>Product </th>
                                <th>Price</th>
                                <th> Category</th>
                                <th>Available</th>
                                <th>#</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        products.map(product => 
                                <tr key={product._id}>
                                    <td><img src={product.image} alt="img" width="75" height="75" /></td>
                                    <td>{product.productName}</td>
                                    <td>{product.price}</td>
                                    <td>{product.categoryName}</td>
                                    <td><input type="checkbox"  onClick={() => {
                                       setProducts( products.map(prod => prod._id===product._id?  {...prod,isAvailable:!prod.isAvailable}:prod ))

                                    } } checked={product.isAvailable} /> </td>
                                    <td><Button color='danger' onClick={() => {
                                        console.log(product._id)
                                        
                                        axios
                                        .delete(`/api/products/${product._id}`)
                                        .then(response=>{
                                            console.log(response.data)
                                            setProducts( products.filter(prod=> prod._id !== product._id ))
                                        })
                                        .catch(err=>console.log({err}))
                                    }}>Delete</Button></td>
                                    <td><Button color='success' onClick={() => this.toggle(product)}>Edit</Button></td>
                                </tr>    
                        )}   
                        </tbody>
                    </Table>
                </div>
            )}
            </AdminContext.Consumer>
        );
    }
}

export default ProductsView ;