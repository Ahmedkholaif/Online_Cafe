import React, { Component } from "react";
import { Container, Row, Col,Input,Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
// import '../css/ManualOrder.css';
import {UserContext}from './UserContext'

class UserOrderProducts extends Component
{      constructor(props){
  super(props);
  this.updateTotal=this.updateTotal.bind(this);
}
  state={
  
  
total:0,
}  




 updateTotal=(total)=>{
   this.setState({total}) 

 }

     render() 
     {   
        return (
    
       <UserContext.Consumer>
           {({order,rooms,setMyOrders,myOrders,setOneOrder,setOrderBody ,submitOrder}  )=>{ 

        const selectedItemsList= order.orderBody;

        const  viewAllSelectedItems = selectedItemsList.length ?
         selectedItemsList.map((product,index) =>  

           <div className="container bg-info mt-5 round " >
            <Row  className="p-1">
            <Col xs="3" className="p-1"> {product.productName}</Col>
           <Col xs="3" className="p-1" > 
           <Input type="number" name="points" step="1" value={product.quantity} defaultValue={1} min="1" onChange={(event)=>{
              setOrderBody(index,event.target.value)
           }} />  
           </Col>
           <Col xs="3" className="p-1"> EGP {product.price * product.quantity} </Col>
           
           <Button onClick={()=>{
             setOneOrder({...order,orderBody:[...order.orderBody.filter(prod => prod.productName !== product.productName )]})
           }} >x</Button>
           </Row>
           </div>
           ) : console.log("no products");

       return (
        <div className="text-center border border-primary rounded p-2 mt-5 ml-0">
        <h2 className="mb-5"> Your Order Here </h2>
        <hr/>
        <div className="mt-5 ">
            {viewAllSelectedItems}
            </div>
            <div className=" " >
           
            <Input type="textarea" name="notes" id="exampleText"
            placeholder="Your Notes Here..." 
            className="text-center mt-4" value={order.notes} onChange={(event)=>{
              setOneOrder({...order,notes:event.target.value})

              }}/> 
            <Input type="select" name="rooms" className="text-center" 
              id="categorySelect" defaultValue={sessionStorage.defaultRoom} onClick={(event)=>{
                  setOneOrder({...order,roomName:event.target.value})
              }}>
              <option className="text-center">Room</option>
              {
                  rooms.map(room =>
                          <option key={room.roomName} defaultValue={room.roomName}>{room.roomName}</option>
                  )
              }
              </Input>
            </div>
            <hr />
            <p className="total" > Total : EGP {order.orderTotal }</p>
            <Button className="confirm bg-submit" onClick={submitOrder}>Confirm</Button>
        </div>
       );
            }}
       </UserContext.Consumer>
        );
     }
}

export default UserOrderProducts ;