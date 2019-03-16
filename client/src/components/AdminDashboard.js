import React from 'react';
import { TabContent, TabPane, Button, Nav, NavItem, NavLink, Col,Row } from 'reactstrap';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
  } from "reactstrap";

import ItemsDisplay from './ItemsDisplay';
import classnames from 'classnames';
import CategoriesView from '../components/CategoriesView'
import UsersView from './UsersView'
import ProductsView from './ProductsView'
import OrdersView from './OrdersView';
import axios from 'axios';
import { Redirect , Link} from 'react-router-dom'
import '../css/LoginForm.css';
import '../css/AdminDashboard.css';
// import "../css/UserHomePage.css";
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
        searchWord:''    
        }
   
    // rooms=[{
    //     roomId:'',
    //     roomName:''
    // }]


    componentDidMount () {
        //fetch all data from back end 

        axios
        .get('/api/users')
        .then(res =>{
            console.log(res)
            res.data.map(obj=>({...obj,_id:obj._id.$oid}))
            this.setUsers(
                res.data.map(obj=>({...obj,_id:obj._id.$oid}))
                 // [...JSON.parse(res.data)]
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
        // this.setCategories([]);

        
        // this.setRooms([]);
        // this.setUsers ([]);
        // this.setOrders ([]);

    }
    handleSignout = (event) => {
        event.preventDefault();
        if (localStorage.token) {
            const conf = {
                headers: { 'x-auth': localStorage.token }
            };
            axios.delete('/api/signout', conf)
                .then(response => {
                    localStorage.clear();
                    window.location.href = '/';
                }).catch(error => {
                    console.log(error);
                });
        }
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
        this.setState({
            order:{...this.state.order,
                dateStamp: moment().format(" YYYY-MM-DD  hh:mm "),
                orderStatus:'Processing'}
        },()=>{
            axios
            .post('/api/orders',this.state.order)
            .then(res=>{
                console.log(res)

                console.log(this.state.order);
                this.setState({
                    orders: [this.state.order,...this.state.orders],
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
}
    render() {

        return (
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
        
                <div className='AdminDashboard'>
                    <Nav tabs style={{cursor:'pointer'}}>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => {
                                this.toggle('1');
                            }}
                        >
                            Home  
                        </NavLink>
                    </NavItem>
                        <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => {
                                this.toggle('2');
                            }}
                        >
                            Manual Order 
                        </NavLink>
                    </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '3' })}
                                onClick={() => {
                                    this.toggle('3');
                                }}
                            >
                                Categories
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '4' })}
                                onClick={() => {
                                    this.toggle('4');
                                }} >
                                Products
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '5' })}
                                onClick={() => {
                                    this.toggle('5');
                                }}
                            >
                                Users

                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '6' })}
                                onClick={() => {
                                    this.toggle('6');
                                }}
                            >
                                Checks
                            </NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar className="leftMenuItem">
                        <DropdownToggle nav caret>
                          User
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
            );
    }
}

// stylesheet
