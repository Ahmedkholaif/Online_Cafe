import React, { Component } from "react";
import { Container,Alert, Row, Col,Input,Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {AdminContext}from './AdminContext'
class OrderProducts extends Component{
 
     render()
     {   
        return (
    
       <AdminContext.Consumer>
           {({order,rooms,setOneOrder,setOrderBody,submitOrder}  )=>{ 

        const selectedItemsList= order.orderBody;

        const  viewAllSelectedItems = selectedItemsList.length ?
         selectedItemsList.map((product,index) =>  
           <div className="bg-info mt-5 " >
            <Col xs="3" > {product.productName}</Col>
           <Col xs="3" className="p-1" > 
           <Input type="number" name="points" step="1" value={product.quantity} defaultValue={1} min="1" onChange={(event)=>{
              setOrderBody(index,event.target.value)
              console.log("indexof  ="+index)
           }} />  
           </Col>
           <Col xs="3" className="p-1"> EGP {product.price * product.quantity} </Col>
           <Button onClick={()=>{
            if(window.confirm("Are You Sure ..?"))
            setOneOrder({...order,orderBody:[...order.orderBody.filter(prod => prod.productName !== product.productName )]})
           }} > x </Button>
           </div>
          ) : console.log("no products");
       return (
        <div className="border border-primary text-center rounded p-2 mt-5 ml-0">
        <h2 className="mb-5"> Your Order Here </h2>
            <div className="mt-5">
            {viewAllSelectedItems}
            </div>
            <div >
            <Input type="textarea" name="text" 
            id="exampleText"
            placeholder="Notes" value={order.notes}
            className="notes m-1 text-center mt-3" onChange={(event)=>{
              setOneOrder({...order,notes:event.target.value})
            }}/> 
            <Input type="select" name="rooms" 
            className="text-center"

            id="categorySelect" onClick={(event)=>{
                  setOneOrder({...order,roomName:event.target.value})
               }}>
               <option>Room</option>
               {
                  rooms.map(room =>
                           <option key={room.roomName} defaultValue={room.roomName}>{room.roomName}</option>
                  )
               }
              </Input>
            </div>
            <hr />
            <p className="total" >Total : EGP {order.orderTotal} </p>
            <Button className="confirm" onClick={submitOrder} > Confirm </Button>
        </div>
       );

            }}
       </AdminContext.Consumer>
        );
     }
}

export default OrderProducts ;