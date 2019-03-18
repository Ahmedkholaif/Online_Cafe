import React, { Component } from "react";
import { Row, Col,Nav,NavLink,NavItem,TabContent,TabPane ,UncontrolledDropdown,
    Button,DropdownItem,DropdownMenu,DropdownToggle} from "reactstrap";
import classnames from 'classnames';
import "../css/UserHomePage.css";
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
        userFullName :'',
        notes:'',
        orderTotal:'',
        orderStatus:'', 
        dateStamp:'',
        roomName:'',
        orderBody:[]
    },
      products:[],
    };
  

  componentDidMount() {
    axios
    .get(
      // `/api/orders/${sessionStorage.userFullName}`
      '/api/orders'
      )
    .then(res=>{
        this.setMyOrders(

            res.data.filter(order=>order.userFullName === sessionStorage.userFullName)
            .map(obj=>({...obj,_id:obj._id.$oid}))
          )
    })
    .catch(err=>console.log(err))

    axios
    .get('/api/products')
    .then(res=>{
        this.setState({
            products: res.data.map(obj=>({...obj,_id:obj._id.$oid}))
        })
    })
    .catch(err=>console.log(err))
    axios
    .get("/api/rooms")
    .then(res=>{
        this.setRooms(
            res.data.map(obj=>({...obj,_id:obj._id.$oid}))
        )
    })
}

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
        if(this.state.order.orderBody.length > 0 && this.state.order.roomName !== '' ) {
           
this.setState({
    order:{...this.state.order,userFullName:sessionStorage.userFullName,
        dateStamp: moment().format(" YYYY-MM-DD  hh:mm "),
        orderStatus:'Processing',phone:sessionStorage.phone }
},()=>{

  axios
.post('/api/orders',this.state.order)
.then(res=>{
    console.log(res)
    this.setState({
        myOrders: [{...this.state.order,_id:res.data.$oid },...this.state.myOrders],
       order:{
        userFullName :'',
        notes:'',
        orderTotal:'',
        orderStatus:'', 
        dateStamp:'',
        roomName:'',
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
       
        <Nav tabs className="pointer" style={{cursor:'pointer'}}>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => {
                                this.toggle('1');
                            }}
                        >
                          <h5>  Home </h5>  
                        </NavLink>
                    </NavItem>
                        <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => {
                                this.toggle('2');
                            }}
                        >
                           <h5 className="c1"> My Orders </h5>  
                        </NavLink>
                    </NavItem>
                
                    <NavItem className="leftMenuItem float-right">
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

            <Link to="/" replace>  
            <Button id="signOut" type="submit" onClick={()=>{
                sessionStorage.clear();
              }}>
                  Sign out
                </Button>
                </Link>
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
