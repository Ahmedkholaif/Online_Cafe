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
        id:'',
        productName:'',
        price:'',
        categoryName:'',
        isAvailable: true,
        image:'',
    },
    selectedFile: null,
    loaded: 0,
}    
           

    handleData(data) {
        this.setState({
            books: data
        });
    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         categories: nextProps.categories,
    //         authors: nextProps.authors
    //     })
    // }

    toggle =(id) =>{
        // console.log(id);
        this.setState(prevState => ({
            modal: !prevState.modal,
            // book: {
            //     bookName: '',
            //     author: '',
            //     category: '',
            // },
            IdEdit: 0
        }));
        if (id !== null) {
            const books = this.state.books;
            const book = books.filter(book => {
                return book._id === id;
            });

            const bookName = book[0].bookName;
            const author = book[0].author;
            const category = book[0].category;
            const description = book[0].description;
            this.setState({
                book: {
                    bookName,
                    author,
                    category,
                    description,
                },
                IdEdit: id,
            });
        }
    }

    handleUpdateBook =() =>{

        const bookName = this.state.book.bookName;
        const author = this.state.book.author;
        const category = this.state.book.category;
        const description = this.state.book.description;

        const id = this.state.IdEdit;
        if (bookName !== '' && id !== 0 && author !== '' && category !== '' && description !== '') {
            const books = this.state.books;
            for (let key in books) {
                if (books[key]._id === id) {
                    books[key].bookName = bookName;
                    books[key].author = author;
                    books[key].category = category;
                    books[key].description = description;
                    console.log(books[key]);
                    // send post
                    const token = localStorage.token;
                    if (token) {
                        const data = new FormData();
                        data.append(
                            "file",
                            this.state.selectedFile,
                            this.state.selectedFile.name,
                        );
                        data.append("body", JSON.stringify(this.state.book));

                        const conf = {
                            onUploadProgress: ProgressEvent => {
                                this.setState({
                                    loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
                                });
                            },
                            headers: {
                                "Content-Type": "application/json",
                                "x-auth": token
                            }
                        };

                        axios.put(`/api/admin/books/${id}`, data, conf)
                            .then(res => {
                                console.log(res);
                                if (res.status === 200) {
                                    books[key].img = res.data.img;

                                    this.setState({
                                        books,
                                        book: {
                                            bookName: '',
                                            description: '',
                                            author: '',
                                            category: '',
                                        },
                                        IdEdit: 0
                                    });
                                    console.log(res.data.img);

                                } else {
                                    console.log("not updated in db");
                                }
                            })
                            .catch(err => {
                                console.log({ err });
                                this.setState({ error: 'Error Delete Operation' })
                            })
                    }
                }
            }
        }
    }


    componentDidMount() {

        // const token = localStorage.token;
        // if (token) {
        //     const conf = {
        //         headers: {
        //             "x-auth": token,
        //         }
        //     }
        //     axios.get('/api/admin/books', conf)
        //         .then(response => {
        //             console.log(response);
        //             if (response.status === 200) {
        //                 this.setState(
        //                     { books: response.data.books }
        //                 );
        //             }
        //             // this.props.passAuthors(response.data);
        //         }).catch(error => {
        //             console.log(error);
        //             this.setState({ error: 'Error reteiriving data' })
        //         })
        // }

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
        // const { name, value } = event.target;

        this.setState({
           product: {...this.state.product, [event.target.name] : event.target.value } 
        },
        ()=>{ console.log(this.state.product)}
        )

    }

    // handleOnChangeBookName = event => {
    //     this.setState({ book: { ...this.state.book, bookName: event.target.value } });
    // }
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
            
            
            
            { ({ products ,setProducts,categories }) => (
                
                <div>
                <AddProduct />
                    <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop}
                        className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Add Product </ModalHeader>
                        <ModalBody>
                            <Input type="text" value={this.state.product.productName} defaultValue={this.state.product.productName}
                                onChange={this.handleOnChangeBookName}
                                placeholder='Category Name' />
                            <Input type="select" name="categoryName" defaultValue={this.state.product.categoryName}
                                id="categorySelect" onClick={this.handleOnChange}>
                                {
                                    categories.map(category =>
                                            <option key={category.id} value={category.categoryName}>{category.catName}</option>
                                    )
                                }
                            </Input>
                            <Input placeholder='Price' type="text" name="price" id="price" onClick={()=>this.handleOnChange} >
                            </Input>
                            <Input type="radio" name="isAvailable" id="isavailable" onClick={()=>this.handleOnChange} >
                            Available
                            </Input>
                            <Input
                                type="file"
                                name=""
                                onChange={this.handleselectedFile}
                                placeholder='Product Photo ' />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.handleUpdateBook}> Edit Product</Button>{' '}
                            <Button color="secondary" onClick={() => this.toggle(null)}>Close</Button>
                        </ModalFooter>
                    </Modal>
                
                   
                   
                    <Table>
                        <thead>
                            <tr>
                                <th> Photo</th>
                                <th>Product </th>
                                <th>Price</th>
                                <th> Category</th>
                                <th>#</th>
                                <th>#</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        products.map(product => 
                                <tr key={product.id}>
                                    <td><img src={product.image} alt="img" width="75" height="75" /></td>
                                    <td>{product.productName}</td>
                                    <td>{product.price}</td>
                                    <td>{product.categoryName}</td>
                                    <td><Button color='danger' onClick={() => this.handleDeleteBook(product)}>Available</Button></td>
                                    <td><Button color='danger' onClick={() => this.handleDeleteBook(product)}>Delete</Button></td>
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