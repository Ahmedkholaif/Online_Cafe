import React, { Component } from "react";
import { Alert, Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from 'axios'
import {AdminContext} from './AdminContext'
class AddProduct extends Component {
   

    // componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         categories: nextProps.categories,
    //         authors: nextProps.authors,
    //     });
    //     // console.log(nextProps.categories,nextProps.authors);
    //     // console.log(this.state.categories,this.state.authors);
    // }

    state = {
        modal: false,
        product : {
            id:'',
            productName:'',
            price:'',
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

    // handleOnChangeCategory = event => {
    //     this.setState({ book: { ...this.state.book, category: event.target.value } });
    // }
    // handleOnChangeAuthor = event => {
    //     this.setState({ book: { ...this.state.book, author: event.target.value } });
    // }
    // handleOnChangeDescription = event => {
    //     this.setState({ book: { ...this.state.book, description: event.target.value } });
    // }

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
                        <Input type="text" name="productName" value={this.state.product.productName} onChange={this.handleOnChange}
                            placeholder='Book Name' />
                        <Input type="select" name="categoryName" id="categorySelect"
                         onClick={this.handleOnChange} >
                        {
                            categories.map( category =>
                                    <option key={category.id} value={category.categoryName}>{category.categoryName}</option>
                            )
                        }
                        </Input>
                        <Input type="text" name="price" id="price" onClick={this.handleOnChange} >
                        </Input>
                        <Input type="radio" name="isAvailable" id="isavailable" onClick={this.handleOnChange} >
                        </Input>
                        

                        <Input
                            type="file"
                            name=""
                            onChange={this.handleselectedFile}
                            placeholder='Product Photo ' />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Add Product </Button>{' '}
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
