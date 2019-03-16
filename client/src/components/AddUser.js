import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Input } from "reactstrap";
import axios from "axios";
import { Redirect } from 'react-router-dom'
import {AdminContext} from './AdminContext';
class AddUser extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    state = {
        users: [],
        modal: false,
        user : {
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

    toggle=() =>{
        this.setState(prevState => ({
            modal: !prevState.modal
        }));

        // if (this.state.author.dateOfBirth === '' || this.state.author.authorFullName === '') {
        // } else {
        //     const token = localStorage.token;
        //     if (token) {
        //         const data = new FormData();
        //         data.append(
        //             "file",
        //             this.state.selectedFile,
        //             this.state.selectedFile.name
        //         );

        //         data.append("body", JSON.stringify(this.state.author));
        //         const conf = {
        //             onUploadProgress: ProgressEvent => {
        //                 this.setState({
        //                     loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
        //                 });
        //             },
        //             headers: {
        //                 "Content-Type": "application/json",
        //                 "x-auth": token
        //             }
        //         };
        //         axios.post('/api/admin/authors', data, conf)
        //             .then(response => {
        //                 console.log(response);
        //                 const authorsProps = this.props.authors;
        //                 authorsProps.push(response.data.author);
        //                 this.setState({ authors: authorsProps });
        //                 this.props.handlerFromParant(authorsProps);
        //                 this.setState({ authors: '' });

        //             }).catch(error => {
        //                 console.log(error);
        //             });
        //     }
        // }
    }

    handleOnChange = (event) => {
        // const { name, value } = event.target;

        this.setState({
           user: {...this.state.user, [event.target.name] : event.target.value } 
        },
        ()=>{ console.log(this.state.user)}
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
            // localStorage.token ?
            <AdminContext.Consumer>
            { ({users,setUsers}) =>(
                <div>
                <h1>Users Data </h1>
                <Button color="success" onClick={this.toggle}>Add User</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add User</ModalHeader>
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
                        <Button color="primary" onClick={()=>{
                            this.toggle();
                            
                            axios
                            .post('/api/users',this.state.user)
                            .then(response=>{
                                console.log(response.data);
                                setUsers([
                                    ...users,{...this.state.user,_id:response.data.$oid}
                                ]);
                                this.setState({
                                    user : {
                                        fullName:'',
                                        email:'',
                                        password:"",
                                        image:'',
                                        defaultRoom:'',
                                        phone:'',
                                        isAdmin:'',
                                    }
                                })
                            })
                            .catch(err=>console.log(err))
                           
                        
                        }}>Add
                            User</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>

            ) }</AdminContext.Consumer>
                // : <Redirect to={{ pathname: '/', state: { from: this.props.location } }} />
        );
    }
}

export default AddUser;