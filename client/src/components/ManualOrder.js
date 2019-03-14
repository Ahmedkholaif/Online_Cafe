import React, { Component } from "react";
import { Container, Row, Col,Input,Button } from 'reactstrap';
// import '../css/ManualOrder.css';
import 'bootstrap/dist/css/bootstrap.css';
import OrderProducts from './OrderProducts';
import ProductsGallery from './ProductsGallery'

class ManualOrder extends Component{

  constructor(props){
    super(props);
    this.state={
      usersList:[
         {
          id :'',
          fullName:'Ramy',
          email:'',
          password:"",
          image:'',
          defaultRoom:'',
          phone:'',
          isAdmin:'',
      },
  
      {
        id :'',
        fullName:'Karam',
        email:'',
        password:"",
        image:'',
        defaultRoom:'',
        phone:'',
        isAdmin:'',
    },
    {
      id :'',
      fullName:'Mohammed',
      email:'',
      password:"",
      image:'',
      defaultRoom:'',
      phone:'',
      isAdmin:'',
  },
      ],
      
      order : {
        id:'',
        userFullName :'',
        notes:'',
        orderTotal:'',
        orderStatus:'', 
        dateStamp:'',
        roomId:'',
        orderBody:[{
            productName:'Tea',
            price:'4',
            quantity:'2',
        },
        {
        productName:'rice',
        price:'10',
        quantity:'3',
    }
      
      ]
    },

     selectedItems:[

      {
        productName:'rice',
        price:'10',
        quantity:'3',
    },
    
    {
      productName:'tea',
      price:'4',
      quantity:'2',
  }
  ]


    }

   
    this.getSelecedUser=this.getSelecedUser.bind(this);

 }


//this is a callback function to be passed to
// UsersList  to get the value of selected item
getSelecedUser(selectedUser)
{ 
 //console.log(selectedUser+" getSelecedUser function");
 var newOrder={...this.state.order}
 newOrder.fullName=selectedUser

 this.setState({ newOrder});


}


    
render()
{
    return (
      

      
      <Container fluid style={{ lineHeight: '32px' } } className="container">
  <Row debug>
    <Col xs="4" className="split left" id="rItem"  > 
         <OrderProducts /> 
    
    </Col>
    <Col xs="8" className="split right" id="lItem" >
    
    <ProductsGallery/>
              
    </Col>
  </Row>
  <br />
 
</Container>
      
        
      );
}

}



export default ManualOrder;