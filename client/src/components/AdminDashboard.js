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
import ChecksView from './CkecksView'

export default class Example extends React.Component {

    state = {
        activeTab: '1',
        categories: [],
        products:[],
        users: [],
        orders:[],
    };

    // user = {
    //     id :'',
    //     fullName:'',
    //     email:'',
    //     password:"",
    //     image:'',
    //     defaultRoom:'',
    //     phone:'',
    //     isAdmin:'',
    // }

    // product = {
    //     id:'',
    //     productName:'',
    //     price:'',
    //     categoryName:'',
    //     isAvailable:'',
    //     image:'',
    // }

    // order ={
    //     id:'',
    //     userFullName :'',
    //     notes:'',
    //     orderTotal:'',
    //     orderStatus:'', 
    //     dateStamp:'',
    //     roomId:'',
    //     orderBody:[{
    //         productName:'',
    //         price:'',
    //         quantity:'',
    //     }]
    // }
    // rooms=[{
    //     roomId:'',
    //     roomName:''
    // }]


    componentDidMount () {
        //fetch all data from back end 

        axios
        .get('/api/users')
        .then(res => console.log(res))
        .catch(err => console.log(err))
        
        axios
        .get('/api/categories')
        .then(res =>{
            console.log(res);
            this.setCategories(
                [...this.state.categories,...res.data]
            )
        } )
        .catch(err => console.log(err))

        axios
        .get('/api/products')
        .then(res =>{
            console.log(res);
            this.setProducts(
                [...this.state.products,...res.data]
            )
        } )
        .catch(err => console.log(err))

        this.setCategories([{
            categoryName:"test1"
        },{
            categoryName:"test2"
        },{
            categoryName:"test3"
        }]);

        this.setProducts([{
                id:'2',
                productName:'pppp11',
                price:'111',
                categoryName:'hot',
                isAvailable: true,
                image:'link',
        },{
            id:'3',
            productName:'pppp33',
            price:'111',
            categoryName:'cold',
            isAvailable: true,
            image:'link',
        }]);
        this.setUsers ([
            {
                id :'1',
                fullName:'aaaaaa',
                email:'aaaaaa',
                password:"aaaaa",
                image:'',
                defaultRoom:'aaaaa',
                phone:'33333333',
                isAdmin:true,
            },
            {
                id :'3',
                fullName:'dddddd',
                email:'dddddd',
                password:"dddd",
                image:'dddd',
                defaultRoom:'dddddd',
                phone:'333445555',
                isAdmin:false,
            }
        ]);
        this.setOrders ([
            {
                    id:'1',
                    userFullName :'Ahmed',
                    notes:'no notes',
                    orderTotal:323,
                    orderStatus:'Processing', 
                    dateStamp: '2010-10-10',
                    phone:'83848484',
                    roomId:'staff',
                    orderBody:[{
                        productName:'tea',
                        price:30,
                        quantity:5,
                    },{
                        productName:'Juice',
                        price:30,
                        quantity:5,
                    },
                    {
                        productName:'tea',
                        price:30,
                        quantity:5,
                    },
                    {
                        productName:'tea',
                        price:30,
                        quantity:5,
                    },{
                        productName:'tea',
                        price:30,
                        quantity:5,
                    },{
                        productName:'tea',
                        price:30,
                        quantity:5,
                    }
                
                ]
                },
                {
                    id:'2',
                    userFullName :'jghghg',
                    notes:'no notes',
                    orderTotal:323,
                    orderStatus:'Processing', 
                    dateStamp:'2010-10-10',
                    phone:'32332',
                    roomId:'staff',
                    orderBody:[{
                        productName:'tea',
                        price:30,
                        quantity:5,
                    },{
                        productName:'Juice',
                        price:30,
                        quantity:5,
                    },{
                        productName:'tea',
                        price:30,
                        quantity:5,
                    },{
                        productName:'tea',
                        price:30,
                        quantity:5,
                    },{
                        productName:'tea',
                        price:30,
                        quantity:5,
                    },{
                        productName:'tea',
                        price:30,
                        quantity:5,
                    },{
                        productName:'tea',
                        price:30,
                        quantity:5,
                    }
                    ]
                }
        ]);
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

    handlePassCategoriesProps = (categoriesProps) => {
        this.setState({
            categories: categoriesProps
        });
    }

    handlePassAuthorsProps = (authorsProps) => {
        this.setState({
            authors: authorsProps
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
    setProducts = (products)=> {
        this.setState({
            products,
        })
    }

    render() {

        return (
            < AdminContext.Provider value = 
            {{ categories :this.state.categories ,setCategories :this.setCategories,
                products : this.state.products , setProducts:this.setProducts,
                users:this.state.users , setUsers:this.setUsers,
                orders:this.state.orders , setOredrs:this.setOrders,
            }} >
        
                <div className='AdminDashboard'>
                    <Nav tabs>
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
                                <OrdersView />
                            </Col>
                        </TabPane>
                    <TabPane tabId="2">
                        <Col sm="12">
                          <Row>
                                        Manual Order 
                                <Col sm="4"> Side Bar Order</Col>
                                <Col sm="8"> 
                                        Products
                                    <Row>
                                        <Col>
                                        Users Choose
                                        </Col>
                                    </Row>
                                    <Row className="seperator10"></Row>
                                    <Row>
                                         <ItemsDisplay items={this.state.products} />
                                    </Row>
                                </Col>
                            </Row> 
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
