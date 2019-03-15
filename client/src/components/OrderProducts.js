import React, { Component } from "react";
import { Container, Row, Col,Input,Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
// import '../css/ManualOrder.css';
import {AdminContext}from './AdminContext'
class OrderProducts extends Component
{      constructor(props){
  super(props);
  this.updateTotal=this.updateTotal.bind(this);
}
  state={
  
  
total:0,
}  



//      componentWillReceiveProps(nextProps)
//  {

//   this.setState({selectedItems:nextProps.selectedItemsList } );

//  }


 updateTotal=(total)=>{
   this.setState({total}) 

 }

     render()
     {   
        return (
    
       <AdminContext.Consumer>
           {({order,rooms,setOneOrder,setOrderBody,deleteOneProduct}  )=>{ 

        const selectedItemsList= order.orderBody;

        const  viewAllSelectedItems = selectedItemsList.length ?
         selectedItemsList.map((product,index) =>  
         
           <div className="container bg-info mt-5 rounded" >
            <Row  className="p-1 ">
            <Col xs="3" className="p-1"> {product.productName}</Col>
           <Col xs="3" className="p-1" > 
           <Input type="number" name="points" step="1" value={product.quantity} defaultValue={1} min="1" onChange={(event)=>{
              setOrderBody(index,event.target.value)
              console.log("indexof  ="+index)
           }
           } />  
           
           </Col>
           <Col xs="3" className="p-1"> EGP {product.price * product.quantity} </Col>
           
           <Button 
          //  onClick={()=>{
            
          //    const productToDeleteName=product.productName
          //    deleteOneProduct(productToDeleteName)
          //   }}
           
           >x</Button>
           </Row>
           </div>
           

           
           
          ) : console.error("no products");
        

       return (
        <div className="orderProducts border  mt-5 ml-0 rounded p-2">
            <div className="products ">
            {viewAllSelectedItems}
            </div>
            <div >
              Notes:
            <Input type="textarea" name="text" id="exampleText" className="notes m-1" onChange={(event)=>{
              setOneOrder({...order,notes:event.target.value})

              }}/> 
            </div> 
            <div>
            <Input type="select" name="rooms" 
                                id="categorySelect" onClick={(event)=>{
                                   setOneOrder({...order,roomId:event.target.value})

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
            <p className="total" > {order.orderTotal}</p>
            <Button className="confirm">Confirm</Button>
        </div>
       );

            }}
       </AdminContext.Consumer>
        );
     }
}

export default OrderProducts ;