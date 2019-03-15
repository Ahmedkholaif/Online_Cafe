import React , {Component }from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button ,Container,Row,Col,Input} from 'reactstrap';
  import {AdminContext}from './AdminContext'
  import '../css/ProductsGallary.css'
class ProductsGallery extends Component {

  render()
  {
      return(

        <AdminContext.Consumer>
        {({order,users,products,setOneOrder,setOrderBody ,updateTotal,getProductsToDisplay,setSearchWord}  )=>( 
         <Container >
            

              <Row   className="p-2">  
              <div class="searchbar">
              <form >
              <input
                       
                        type="text"
                        name=""
                        placeholder="Search..."
                        onChange={(event)=>{
                          if(event.target.value==='')
                           setSearchWord('')
                          setSearchWord(event.target.value)
                          console.log(event.target.value)
  
                        }}
                      />
                      
                        <i class="fas fa-search" />
                      
               </form>
                    
                      </div>
              </Row>
              
              <hr/>
              <Row  className="p-3" >  
              <div>
                Add to user:
            <Input type="select" name="usersList" 
                                id="usersList"  onClick={(event)=>{
                                   setOneOrder({...order,userFullName:event.target.value})

                                }}>
                                <option>Select User</option>
                                {
                                    users.map(user =>
                                            <option key={user.id} defaultValue={user.fullName}>{user.fullName}</option>
                                    )
                                }
              </Input>
              
            </div>
              </Row>
              <hr/>
              <Row className ="productsGallary" >  
             
                { getProductsToDisplay.map (product =>
                     <Col sm="3">
                     <div className="card-deck">
                              
                    <Card className="p-2 m-2 rounded ">
                      <CardImg top width="100%"  src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                      <CardBody className="p-0 m-0" >
                        <CardTitle >{product.productName}</CardTitle>
                        <CardText>EGP{product.price}</CardText>
                        
                        <Button onClick={ (event)=>{  
                            event.target.disabled = 'disabled';
                            let newProduct={productName:product.productName,
                            price:product.price,
                            quantity:'1'
                            }
                            // console.log("newProdust"+newProdust)
                             const newOrderBody=order.orderBody
                             newOrderBody.push(newProduct)
                            const newOrderTotal=parseFloat(order.orderTotal)+parseFloat(newProduct.price);
                            console.log(newOrderTotal)
                            setOneOrder({...order,orderBody:newOrderBody,orderTotal:newOrderTotal,
                              orderTotal:order.orderTotal+parseFloat(product.price)
                            })
                           // console.log({...order,orderBody:newOrderBody,orderTotal:newOrderTotal})
                           //updateTotal();
                           //setOrderBody(indexOfProduct, '1')

                        }}
                         
                         >Add</Button>
                      </CardBody>
                    </Card>
                    </div>
                    </Col>  

                )}
   

              </Row>




         </Container>
       





        )}
        </AdminContext.Consumer>
        );




  }











}
export default ProductsGallery;
