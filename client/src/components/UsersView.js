import React, { Component } from 'react';
import '../css/AuthorView.css';
import AddUser from './AddUser';
import axios from "axios";
import { Redirect } from 'react-router-dom'
import { Alert, Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap";
import {AdminContext} from './AdminContext';
class UsersView extends Component {

    state = { 
        users: [],
        modal: false,
        user : {
        id :'',
        fullName:'',
        email:'',
        password:"",
        image:'',
        defaultRoom:'',
        phone:'',
        isAdmin:'',
    },
        inEdit: {},
        selectedFile: null,
        loaded: 0,
    };

   

    toggle =(user)=> {
        if(user !== null)
            this.setState(prevState => ({
                modal: !prevState.modal,
                inEdit: user,
                user
            }));
        // else {
        //     this.setState(prevState => ({
        //         modal: !prevState.modal,
                
        //     }));
        // }
           
    }

    // handleUpdateAuthor() {

    //    

    // }

    // handleDeleteAuthor = deletedId => {
    // }

    componentDidMount() {
       

    }
    handleOnChange = (event) => {
        // const { name, value } = event.target;

        this.setState({
           user: {...this.state.user, [event.target.name] : event.target.value } 
        },
        ()=>{ console.log(this.state.user)}
        )

    }
   
    // handleselectedFile = event => {
    //     this.setState({
    //         selectedFile: event.target.files[0],
    //         loaded: 0
    //     });
    // };
    // toggle=() =>{
    //     this.setState(prevState => ({
    //         modal: !prevState.modal
    //     }));}
    render() {
        // const { authors, error } = this.state;
        // const authorsView = authors.length ? authors.map(author =>
        //     <tr key={author._id}>
        //         <td><img src={author.img} alt="img" width="75" height="75" /></td>
        //         <td>{author.fullName}</td>
        //         <td>{author.dateOfBirth}</td>
        //         <td><Button color='danger' onClick={() => this.handleDeleteAuthor(author._id)}>Delete</Button></td>
        //         <td><Button color='success' onClick={() => this.toggle(author._id)}>Edit</Button></td>
        //     </tr>
        // ) : error ? <h1><Alert color='danger'>{error}</Alert></h1> : null;

        return (
            // localStorage.token ?
            <AdminContext.Consumer>
            { ({users,setUsers})=>(
                <div>
                    <AddUser users={this.state.users} handlerFromParant={this.handleData} />
                    <Modal isOpen={this.state.modal} toggle={() => this.toggle()}
                        className={this.props.className}>
                        <ModalHeader>Edit User </ModalHeader>
                        <ModalBody>
                            <Input type="text" name="fullName"  defaultValue={this.state.user.fullName}
                                onChange={this.handleOnChange}
                                placeholder='Full Name' />
                            <Input type="email" name="email" defaultValue={this.state.user.email}
                                onChange={this.handleOnChange}
                                placeholder='Email' />
                                <Input type="phone" name="phone" defaultValue={this.state.user.phone}
                        onChange={this.handleOnChange}
                        placeholder='Phone' />
                            <Input type="text" name="defaultRoom" defaultValue={this.state.user.defaultRoom}
                            onChange={this.handleOnChange}
                            placeholder='Default Room' />
                            <Input type="password" name="password" defaultValue={this.state.user.password}
                                onChange={this.handleOnChange}
                                placeholder='Password' />
                                <Input type="text" name="image" defaultValue={this.state.user.image}
                                onChange={this.handleOnChange}
                                placeholder='Image' />
                                
                            <Input
                                type="file"
                                name=""
                                id="exampleFile"
                                onChange={this.handleselectedFile}
                                placeholder='user Photo ' />

                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => {
                                setUsers(users.map(user => user.id === this.state.inEdit.id ? this.state.user : user ))
                                this.setState({
                                    modal:false,
                                })
                            }}>Edit User</Button>{' '}
                            <Button color="secondary" onClick={()=>{
                                this.setState({
                                    modal: ! this.state.modal
                                })
                            }}>Close</Button>
                        </ModalFooter>
                    </Modal>
                    <Table>
                        <thead>
                            <tr>
                                <th> Photo </th>
                                <th> Full-Name</th>
                                <th> E-Mail</th>
                                <th> Default Room </th>
                                <th> Phone </th>
                                <th>#</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                         users.map(user => 
                                <tr key={user.id}>
                                    <td><img src={user.image} alt="img" width="75" height="75" /></td>
                                    <td>{user.fullName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.defaultRoom}</td>
                                    <td>{user.phone}</td>
                                    <td><Button color='danger' onClick={() => {
                                        setUsers(users.filter(user1 => user1.id !== user.id))
                                        axios
                                        .delete(`/api/products/${user.email}`)
                                        .then(response=>console.log(response.data))
                                    }}>Delete</Button></td>
                                    <td><Button color='success' onClick={() => this.toggle(user)}>Edit</Button></td>
                                </tr>
                         )}
                        </tbody>
                    </Table>
                </div>
            )}
            </AdminContext.Consumer>
                // : <Redirect to={{ pathname: '/', state: { from: this.props.location } }} />
        );
    }
}

export default UsersView;
