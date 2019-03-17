import React, { Component } from "react";
import {  Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from 'axios'
import {AdminContext} from './AdminContext'
import '../css/AdminDashboard.css';
import validator from 'validator';
class AddProduct extends Component {


    state = {
        modal: false,
        product : {
            id:'',
            productName:'',
            price:0,
            categoryName:'',
            isAvailable: "",
            image:'',
        },
        selectedFile: null,
        loaded: 0,
    };

    toggle=()=> {
        this.setState(prevState => ({
            modal: !prevState.modal,
        }));
        // console.log('toogle before if', this.state.book);
        // if (this.state.book.bookName === '' || this.state.book.author === '' || this.state.book.category === ''
        //     || this.state.book.description === ''
        // ) {
        //     console.log('toogle in if');
        // } else {
        //     console.log('toogle after if', this.state.book);
        //     const token = localStorage.token;
        //     if (token) {
        //         const data = new FormData();
        //         data.append(
        //             "file",
        //             this.state.selectedFile,
        //             this.state.selectedFile.name
                // );

                // data.append("body", JSON.stringify(this.state.book));
                // const conf = {
                //     onUploadProgress: ProgressEvent => {
                //         this.setState({
                //             loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
                //         });
                //     },
                //     headers: {
                //         "Content-Type": "application/json",
                //         "x-auth": token
                //     }
                // };
                // axios.post('/api/admin/books', data, conf)
                //     .then(response => {
        //                 console.log(response);
        //                 const booksProps = this.props.books;
        //                 booksProps.push(response.data.book);
        //                 this.setState({
        //                     books: booksProps
        //                 });
        //                 this.props.handlerFromParant(booksProps);
        //                 this.setState({
        //                     books: ''
        //                 });

        //             }).catch(error => {
        //                 console.log(error);
        //             });
        //     }
        // }
    }

    handleOnChange = (event) => {
        // const { name, value } = event.target;

        this.setState({
           product: {...this.state.product, [event.target.name] : event.target.value } 
        },
        ()=>{ console.log(this.state.product)}
        )

    }

    handleOnChangeBox = (event) => {
        this.setState({
           product: {...this.state.product, [event.target.name] : event.target.checked } 
        },
        ()=>{ console.log(this.state.product)}
        )

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
            {   ({categories,products,setProducts})=>(
            <div>
                <h1>Products Page </h1>
                <Button color="success" onClick={this.toggle}> Add Product </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add Product</ModalHeader>
                    <ModalBody>
                        <Input type="text" name="productName"  onChange={this.handleOnChange}
                            placeholder='Product Name' />
                        <Input type="select" name="categoryName" id="categorySelect"
                         
                        onChange={this.handleOnChange} >
                        <option > category</option>
                        {
                            categories.map( category =>
                                    <option key={category.id} value={category.categoryName}>{category.categoryName}</option>
                            )
                        }
                        </Input>
                        <Input type="number" name="price" min='5' onChange={this.handleOnChange} placeholder="Price" />
                         <br/>
                        Available <br/>
                        <Input type="checkbox" id="isAvailable" name="isAvailable"  onChange={this.handleOnChangeBox} />
                        <hr/>
                        <Input type="text" name="image"  onChange={this.handleOnChange} placeholder="image" />
                        <Input
                            type="file"
                            name=""
                            onChange={this.handleselectedFile}
                            placeholder='Product Photo ' /> 
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={ ()=>{
                            if(this.state.product.categoryName === '' || !validator.isNumeric( this.state.product.price)  ||
                            this.state.product.productName === '' || this.state.product.image === '' ||
                            products.map(prod=> (prod.productName)).includes(this.state.product.productName)
                            ){
                                alert("Invalid Data ")
                            }else {

                            axios
                            .post('/api/products',this.state.product)
                            
                            .then(response=>{
                                console.log(response.data);
                                setProducts([
                                    ...products,{...this.state.product}
                                ]);
                                this.setState({
                                    modal: ! this.state.modal,
                                    product : {
                                        id:'',
                                        productName:'',
                                        price:0,
                                        categoryName:'',
                                        isAvailable: "",
                                        image:'',
                                    }
                                });
                            })
                            .catch(err=>console.log(err))
                            }
                            
                         }} > Add Product </Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )}
            </AdminContext.Consumer>
        );
    }
}

export default AddProduct;
