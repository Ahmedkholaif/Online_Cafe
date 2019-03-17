import React, { Component } from 'react';
import { Table, Button, Alert, ModalHeader, ModalBody, ModalFooter, Modal, Input } from "reactstrap";
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import '../css/CategoriesView.css';
import AddCategory from './AddCategory';
import {AdminContext} from './AdminContext';
class CategoriesView extends Component {
   

    state = {
        categories: [],
        category:{
            categoryName:'',
            id:null ,
        },
        modal: false,
        nameEdit: '',
        inEdit: {}
    };

    toggle =(category) => {
        this.setState(prevState => ({
            modal: !prevState.modal,
            NameEdit: '',
            idEdit: 0
        }));

        if (category !== null) {
        //     const categories = this.state.categories;
        //     const category = categories.filter(category => {
        //         return category.categoryName === id;
        //     });

            // const catid = category[0]._id;
            // const cattitle = category[0].categoryName;
            this.setState({
                // NameEdit: cattitle,
                category,
            });
        }

    }

    handleUpdateCategory = ()=> {

        // const title = this.state.NameEdit;
        // const id = this.state.IdEdit;

        // if (this.state.category) {
        //     // const categories = this.state.categories;
        //     for (let key in categories) {
        //         if (categories[key]._id === id) {
        //             categories[key].categoryName = title;
        //             this.setState({ categories: categories });
        //             this.setState({
        //                 NameEdit: '',
        //                 idEdit: ''
        //             });

        
               
                    // // send put request
                    // const token = localStorage.token;
                    // if (token) {
                    //     const conf = {
                    //         headers: {
                    //             "x-auth": token,
                    //         }
                    //     }
                    //     axios.put(`/api/admin/categories/${id}`, {
                    //         categoryName: title
                    //     }, conf)
                    //         .then(res => {
                    //             console.log(res);
                    //             if (res.status === 200) {
                    //                 console.log(res);

                    //             } else {
                    //                 console.log("not updated in db");
                    //             }
                    //         })
                    //         .catch(err => {
                    //             console.log({ err });
                    //             this.setState({ error: 'Error Delete Operation' })
                    //         })
                    // }
        //         }
        //     }
        // }
    }

    handleData=(data)=> {
        this.setState({
            categories: data
        });
    }

    componentDidMount() {
        // const token = localStorage.token;
        // if (token) {
        //     const conf = {
        //         headers: {
        //             "x-auth": token,
        //         }
        //     }
        //     axios.get(`/api/admin/categories`, conf)
        //         .then(res => {
        //             // console.log(res);
        //             this.setState({
        //                 categories: res.data
        //             })
        //             this.props.passCategories(res.data);

        //         })
        //         .catch(err => {
        //             console.log(err)
        //         })
        //     this.setState({ error: 'Error reteiriving data' })
        // }
    }

    handleDeleteCategory = deletedId => {
        const token = localStorage.token;
        if (token) {
            const conf = {
                headers: {
                    "x-auth": token,
                }
            }
            axios.delete(`/api/admin/categories/${deletedId}`, conf)
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
        this.setState({ categories: this.state.categories.filter(category => category._id !== deletedId) });

    }

    handleOnChange = event => {
        this.setState({ category :{categoryName: event.target.value} });
        console.log(this.state.category);
    }

    render() {

        

        // const { categories, error } = this.state;

        
       

        return (
            <AdminContext.Consumer>
            { ( { categories ,setCategories} ) =>(
                
                
                // const categoriesView = 
                // {console.log(categories)}
                <div className='CategoriesTable'>
                    <AddCategory categories={categories} handlerFromParant={this.handleData} />
                    <Modal isOpen={this.state.modal} toggle={() => this.toggle()}
                        className={this.props.className}>
                        <ModalHeader>Add Category</ModalHeader>
                        <ModalBody>
                            <Input type="text" defaultValue={this.state.inEdit.categoryName} onChange={this.handleOnChange}
                                placeholder='Category Name' />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => {
                                categories.forEach(cat =>{
                                    if(cat.categoryName === this.state.inEdit.categoryName) {
                                        cat.categoryName = this.state.category.categoryName;
                                        setCategories([...categories]);
                                        axios
                                        .put(`/api/categories/${cat._id}`,{
                                            "categoryName":this.state.categoryName
                                        })
                                        .then(response=>{
                                            console.log(response);
                                        })
                                        .catch(err=>{
                                            console.log(err);
                                        })
                                    }
                                });
                                this.setState({
                                    modal:!this.state.modal
                                })
                            }}>
                            EditCategory</Button>{' '}
                            <Button color="secondary" onClick={() => this.toggle(null)}>Close</Button>
                        </ModalFooter>
                    </Modal>
                    <Table>
                        <thead>
                            <tr>
                                <th>Category Name</th>
                                <th>#</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                         
                        { categories.map(category =>
                                <tr key={category._id}>
                                    <td>{category.categoryName}</td>
                                    <td><Button color='danger' onClick={() => {
                                        if( window.confirm('Are You Sure ?')){
                                            setCategories(
                                                categories.filter(cat => cat.categoryName !== category.categoryName   )
                                            )
                                            axios
                                            .delete(`/api/categories/${category._id}`)
                                            .then(response=>{
                                                console.log(response.data);
                                            })
                                            .catch(err=>{
                                                console.log(err);
                                            })
                                        }
                                        
                                    }}>Delete</Button></td>
                                    <td><Button color='success' onClick={() => {
                                        this.setState({
                                            inEdit: category,
                                        });
                                        this.toggle(category);
                                    }}>Edit</Button></td>
                                </tr>
                        )
                        }
                        </tbody>
                    </Table>
                </div>
               
            )}
            
            </AdminContext.Consumer>
        );
    }
}

export default CategoriesView;