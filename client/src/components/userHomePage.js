import React, { Component } from "react";
import { Row, Col,Nav,NavLink,NavItem,TabContent,TabPane ,UncontrolledDropdown,
    Button,DropdownItem,DropdownMenu,DropdownToggle} from "reactstrap";
import classnames from 'classnames';
import "../css/UserHomePage.css";
import CustomNavbar from "./Navbar";
import CustomPagination from "./pagination";
import { Redirect } from "react-router-dom";
import axios from "axios";
import {UserContext} from './UserContext';
import MyOrders from './MyOrders.js';
import {BrowserRouter,Route ,Router,Link} from "react-router-dom";
import GuestHomePage from "./GuestHomePage";
import UserProductsGallery from './UserProductsGallery'
import UserOrderProducts from "./UserOrderProducts";
import moment from 'moment';
class UserHomePage extends Component {
  
    state = {
      isOpen: false,
      activePage: 1,
      activeTab:'1',
      itemsCount: 1,
      shelf: "all",
      myOrders: [],
      rooms:[],
      order: {
        id:'',
        userFullName :'',
        notes:'',
        orderTotal:'',
        orderStatus:'', 
        dateStamp:'',
        roomId:'',
        orderBody:[]
    },
      products:[{
        id:'2',
        productName:'caffee',
        price:'6',
        categoryName:'hot',
        isAvailable: true,
        image:'link',
},{
    id:'3',
    productName:'7up',
    price:'12',
    categoryName:'cold',
    isAvailable: true,
    image:'link',
},{
    id:'4',
    productName:'cheese',
    price:'29',
    categoryName:'cold',
    isAvailable: true,
    image:'link',
}],
    };
  

  componentDidMount() {

    this.setMyOrders(
      [
        {
                id:'1',
                userFullName :'Ahmed',
                notes:'no notes',
                orderTotal:323,
                orderStatus:'Processing', 
                dateStamp: '2019-10-10',
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
                userFullName :'Ahmed',
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
            },{
                id:'3',
                userFullName :'Medo',
                notes:'no notes',
                orderTotal:323,
                orderStatus:'Processing', 
                dateStamp: '2012-10-10',
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
                }]
            },
            {
                id:'4',
                userFullName :'Ahmed Kholaif',
                notes:'no notes',
                orderTotal:323,
                orderStatus:'Processing', 
                dateStamp: '2015-11-10',
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
                }]
            },{
                id:'5',
                userFullName :'Ahmed Kholaif22',
                notes:'no notes',
                orderTotal:323,
                orderStatus:'Processing', 
                dateStamp: '2018-12-10',
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
                }]
            },{
                id:'6',
                userFullName :'Ahmed Kholaif',
                notes:'no notes',
                orderTotal:323,
                orderStatus:'Out For Delivery', 
                dateStamp: '2018-10-10',
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
                }]
            }
    ]
    )
    // const token = localStorage.token;
    // if (token) {
    //   const conf = {
    //     params: {
    //       page: `${this.state.activePage}`,
    //       mode: `${this.state.shelf}`
    //     },
    //     headers: {
    //       "x-auth": token
    //     }
    //   };

    //   axios
    //     .get(
    //       `/api/users/current?page=${this.state.activePage}?mode=${
    //       this.state.shelf
    //       }`,
    //       conf
    //     )
    //     .then(res => {
    //       console.log(res.data);
    //       this.setState({
    //         books: res.data.books,
    //         itemsCount: res.data.count
    //       });
    //     })
    //     .catch(err => console.log(err));
    // }
  }

  // test = setInterval(() => {
  //   alert(this.state.books[0].rate)
  // }, 5000);

  // sendRequestShelf = shelf => {
  //   const token = localStorage.token;
  //   if (token) {
  //     const conf = {
  //       params: {
  //         page: 1,
  //         mode: `${shelf}`
  //       },
  //       headers: {
  //         "x-auth": token
  //       }
  //     };
  //     axios
  //       .get(`/api/users/current`, conf)
  //       .then(res => {
  //         console.log(conf.params.mode, res.data.books);

  //         this.setState({
  //           books: res.data.books,
  //           activePage: 1,
  //           itemsCount: res.data.count
  //         });
  //       })
  //       .catch(err => console.log(err));
  //   }
  // };

  // displayAllBooks = () => {
  //   if (this.state.shelf !== "all") {
  //     this.setState({
  //       shelf: "all",
  //       activePage: 1
  //     });
  //     this.sendRequestShelf("all");
  //   }
  // };
  // displayReadBooks = () => {
  //   if (this.state.shelf !== "read") {
  //     this.setState({
  //       shelf: "read",
  //       activePage: 1
  //     });
  //     this.sendRequestShelf("read");
  //   }
  // };
  // displayCurrentlyReadingBooks = () => {
  //   if (this.state.shelf !== "current") {
  //     this.setState({
  //       shelf: "current",
  //       activePage: 1
  //     });
  //     this.sendRequestShelf("current");
  //   }
  // };
  // displayToReadBooks = () => {
  //   if (this.state.shelf !== "toRead") {
  //     this.setState({
  //       shelf: "toRead",
  //       activePage: 1
  //     });
  //     this.sendRequestShelf("toRead");
  //   }
  // };

  // handelPagination = pageNum => {
  //   const token = localStorage.token;
  //   if (token) {
  //     const conf = {
  //       params: {
  //         page: `${pageNum}`,
  //         mode: `${this.state.shelf}`
  //       },
  //       headers: {
  //         "x-auth": token
  //       }
  //     };
  //     axios
  //       .get(`/api/users/current`, conf)
  //       .then(res => {
  //         this.setState({
  //           books: res.data.books,
  //           activePage: pageNum
  //         });
  //       })
  //       .catch(err => console.log(err));
  //   }
  // };

  setMyOrders = (myOrders) =>{
    this.setState({
      myOrders,
    })
  }
  toggle =(tab) => {
    if (this.state.activeTab !== tab) {
        this.setState({
            activeTab: tab
        });
    }
}
setRooms=(rooms)=>
    {this.setState({
        rooms,

    })}

    updateTotal =( )=>
    { 
       const orderTotal=this.state.order.orderBody.reduce(
           (acc,prod)=> (acc + (prod.quantity*prod.price) ),0
        );
        console.log(orderTotal);
        console.log(this.state.order);
      this.setState({
        order:{...this.state.order,orderTotal}
      },()=>console.log(this.state.order));

    }
    setOneOrder=(order)=>{
        
        this.setState({
            order,
            
        },this.updateTotal);
    }

    setOrderBody=(index,quantity)=>
    { let newOrderBody=this.state.order.orderBody
       newOrderBody[index].quantity=quantity;
      this.setState({
       order:{...this.state.order,orderBody:newOrderBody}

      })
      this.updateTotal();
    }
    submitOrder =()=>{
        this.setState({
            order:{...this.state.order,userFullName:sessionStorage.userFullName,
                dateStamp: moment().format(" YYYY-MM-DD  hh:mm "),
                orderStatus:'Processing'}
        },()=>{
            console.log(this.state.order);
            this.setState({
                myOrders: [this.state.order,...this.state.myOrders],
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
}
  render() {
    return ( 
    // localStorage.token ? (
      
    <UserContext.Provider
    value ={{
        myOrders:this.state.myOrders ,setMyOrders:this.setMyOrders ,
        products :this.state.products,
        setOrderBody:this.setOrderBody,
        order:this.state.order,setOneOrder:this.setOneOrder,
        rooms:this.state.rooms,submitOrder:this.submitOrder
    }}
    >
      <div>
       
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
                            My Orders 
                        </NavLink>
                    </NavItem>
                
                    <NavItem className="leftMenuItem">
              <div class="container h-100">
                <div class="d-flex justify-content-center h-100">
                  <div class="searchbar">
                    <form action="/api/users/current/search" method="post">
                      <input
                        class="search_input"
                        type="text"
                        name=""
                        placeholder="Search..."
                      />
                      <button type="submit" class="search_icon">
                        <i class="fas fa-search" />
                      </button>
                    </form>

                  </div>
                </div>
              </div>
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
              <Button id="signOut" type="submit">
                <Link to="/" replace>
                  Sign out
                </Link>
              </Button>
            </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                            <Col sm="12">
                            <Row>
                            <Col xs="4" className="split left" id="rItem"  > 
                            <UserOrderProducts/>
                            </Col>
                            <Col xs="8" className="split right" id="lItem" >
                            
                            <UserProductsGallery/>
                                    
                            </Col>
                            </Row>
                            </Col>
                        </TabPane>
                    <TabPane tabId="2">
                        <Col sm="12">
                        <MyOrders />
                            
                          
                        </Col>
                    </TabPane>
                </TabContent>
                    
           </div>         
      </UserContext.Provider>

    // ) : (
    //     <Redirect to={{ pathname: "/", state: { from: this.props.location } }} />
    //   );
  
    )}
}

export default UserHomePage;
