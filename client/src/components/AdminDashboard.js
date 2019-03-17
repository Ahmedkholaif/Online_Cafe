import React from 'react';
import { TabContent, TabPane, Button, Nav, NavItem, NavLink, Col,Row } from 'reactstrap';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
  } from "reactstrap";

import classnames from 'classnames';
import CategoriesView from '../components/CategoriesView'
import UsersView from './UsersView'
import ProductsView from './ProductsView'
import OrdersView from './OrdersView';
import axios from 'axios';
import { Redirect , Link} from 'react-router-dom'
import '../css/LoginForm.css';
import '../css/AdminDashboard.css';
import {AdminContext} from './AdminContext';
import ManualOrder from './ManualOrder';
import ChecksView from './CkecksView'
import moment from 'moment';

export default class Example extends React.Component {

    state = {
        activeTab: '1',
        categories: [],
        products:[],
        users: [],
        orders:[],
        rooms:[],
        order : {
            id:'',
            userFullName :'',
            notes:'',
            orderTotal:0,
            orderStatus:"Processing", 
            dateStamp: '2010-10-10',
            phone:'',
            roomId:'',
            orderBody:[]
            },
        searchWord:'',
        error:'',    
        }
   


    componentDidMount () {
        //fetch all data from back end 
        axios
        .get('/api/rooms')
        .then(res=>{
            this.setState({
                rooms: res.data.map(obj=>({...obj,_id:obj._id.$oid}))
            })
        })
        .catch(err=>console.log(err))
        axios
        .get('/api/users')
        .then(res =>{
            console.log(res)
            res.data.map(obj=>({...obj,_id:obj._id.$oid}))
            this.setUsers(
                res.data.map(obj=>({...obj,_id:obj._id.$oid}))
             )
        })
        .catch(err => console.log(err))
        
        axios
        .get('/api/categories')
        .then(res =>{
            console.log(res);
           
            this.setCategories(
               res.data.map(obj=>({...obj,_id:obj._id.$oid}))
                // [...JSON.parse(res.data)]
            )
        } )
        .catch(err => console.log(err))

        axios
        .get('/api/products')
        .then(res =>{
            console.log(res);
            this.setProducts(
                res.data.map(obj=>({...obj,_id:obj._id.$oid}))
            )
        } )
        .catch(err => console.log(err))
        axios
        .get('/api/orders')
        .then(res=>{
            this.setOrders(
                res.data.map(obj=>({...obj,_id:obj._id.$oid}))
            )
        })
    }
    handleSignout = (event) => {
        event.preventDefault();
       
        sessionStorage.clear();
        axios.delete('/api/signout')
            .then(response => {
                localStorage.clear();
                window.location.href = '/';
            }).catch(error => {
                console.log(error);
            });
        
    }
    toggle =(tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    setUsers = (users)=> {
        this.setState({
            users,
        })
    }
    setCategories = (categories)=> {
        this.setState({
            categories,
        })
    }
    setOrders = (orders)=> {
        this.setState({
            orders,
        })
    }
    setOneOrder=(order)=>{
        this.setState({
            order,
        } ,this.updateTotal )
        
      console.log(this.state.order)
    }
    setOrderBody=(index,quantity)=>
    { let newOrderBody=this.state.order.orderBody
       newOrderBody[index].quantity=quantity;
      this.setState({
       order:{...this.state.order,orderBody:newOrderBody}

      })
      this.updateTotal();
    }
    getProductsToDisplay=()=>
    {  
        if(this.state.searchWord !== '')
        {
  
        return  this.state.products.filter(prod=>prod.productName===this.state.searchWord)
        }
      else
      return this.state.products  
         
    }
    setSearchWord=(searchWord)=>{
        this.setState({
            searchWord,
        })
    }

    setProducts = (products)=> {
        this.setState({
            products,
        })

    }
    setRooms=(rooms)=>
    {this.setState({
        rooms,

    })}
    updateTotal=()=>
    { 
       const orderTotal=this.state.order.orderBody.reduce(
           (acc,prod)=> (acc + (prod.quantity*prod.price) ),0
        );
        console.log(orderTotal);
        console.log(this.state.order);
      this.setState({
    
        order:{...this.state.order,orderTotal}
      });

    }

    submitOrder =()=>{
        if(this.state.order.orderBody.length > 0 && this.state.order.userFullName !== '' ) {
            const phone = this.state.users.filter(usr=> usr.fullName === this.state.order.userFullName)
            .phone;
this.setState({
order:{...this.state.order,
    dateStamp: moment().format(" YYYY-MM-DD  hh:mm "),
    orderStatus:'Processing',phone }
},()=>{
axios
.post('/api/orders',this.state.order)
.then(res=>{
    console.log(res)
    this.setState({
        orders: [{...this.state.order,_id:res.data.$oid },...this.state.orders],
       order:{
        id:'',
        userFullName :'',
        notes:'',
        orderTotal:'',
        orderStatus:'', 
        dateStamp:'',
        roomId:'',
        orderBody:[],
       }
    })
    })
    })


        }else {
            alert("Invalid Order Data..! ")
        }
       
}
    render() {

        return (

            sessionStorage.isAdmin ?
            < AdminContext.Provider value = 
            {{ categories :this.state.categories ,setCategories :this.setCategories,
                products : this.state.products , setProducts:this.setProducts,
                users:this.state.users , setUsers:this.setUsers,
                orders:this.state.orders , setOredrs:this.setOrders,
                order:this.state.order,setOneOrder:this.setOneOrder,
                rooms:this.state.rooms,setRooms:this.setRooms,
                setOrderBody:this.setOrderBody,
                submitOrder:this.submitOrder,
            }} >
            {console.log(sessionStorage)}
                
                    
                <div className='AdminDashboard'>
                    <Nav tabs style={{cursor:'pointer'}}>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => {
                                this.toggle('1');
                            }}
                        >
                           <h5> Home </h5>   
                        </NavLink>
                    </NavItem>
                        <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => {
                                this.toggle('2');
                            }}
                        >
                           <h5>  Manual Order </h5> 
                        </NavLink>
                    </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '3' })}
                                onClick={() => {
                                    this.toggle('3');
                                }}
                            >
                              <h5>  Categories </h5>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '4' })}
                                onClick={() => {
                                    this.toggle('4');
                                }} >
                              <h5>   Products </h5>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '5' })}
                                onClick={() => {
                                    this.toggle('5');
                                }}
                            >
                               <h5> Users </h5>

                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '6' })}
                                onClick={() => {
                                    this.toggle('6');
                                }}
                            >
                               <h5> Checks </h5>
                            </NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar className="leftMenuItem">
                        <DropdownToggle nav caret>
                          Admin
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem>Edit Profile</DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem>Account setting</DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                      <NavItem className="leftMenuItem">
                        <Button color='danger' type="submit">
                          <Link to="/" replace>
                            Sign out
                          </Link>
                        </Button>
                      </NavItem>
                        
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                            <Col sm="12">
                                <OrdersView orders={this.state.orders } />
                            </Col>
                        </TabPane>
                    <TabPane tabId="2">
                        <Col sm="12">
                        <ManualOrder/>
                        
                        </Col>
                    </TabPane>
                    
                    <TabPane tabId="3">
                            <Col sm="12">
                                <CategoriesView passCategories={this.handlePassCategoriesProps} />
                            </Col>
                        </TabPane>
                        <TabPane tabId="4">
                            <Col sm="12">
                                <ProductsView categories={this.state.categories} authors={this.state.authors} />
                            </Col>
                        </TabPane>
                        <TabPane tabId="5">
                            <Col sm="12">
                                <UsersView />
                            </Col>
                        </TabPane>
                        <TabPane tabId="6">
                        <Col sm="12">
                                <ChecksView/>
                        </Col>
                    </TabPane>
                    </TabContent>
                </div>
    
                </AdminContext.Provider>
                
                : <Redirect to={{ pathname: '/', state: { from: this.props.location } }} />
            );
    }
}
