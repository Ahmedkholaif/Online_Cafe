import React , {Component }from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button ,Container,Row,Col,Input} from 'reactstrap';
  import {AdminContext}from './AdminContext'
class ProductsGallery extends Component {

  render()
  {
      return(

        <AdminContext.Consumer>
        {({order,users,products,setOneOrder,setOrderBody}  )=>( 
         <Container >
              <Row   className="p-2">  
                  Search bar
                 
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
                { products.map (product =>
                     <Col sm="3">
                     <div>
                              
                    <Card >
                      <CardImg top width="100%"  src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                      <CardBody  >
                        <CardTitle >{product.productName}</CardTitle>
                        <CardText>{product.price}</CardText>
                        
                        <Button onClick={ (event)=>{  
                           event.target.disabled = 'disabled';
                           let newProduct={productName:product.productName,
                            price:product.price,
                            quantity:'1'
                           }
                           setOneOrder({...order,orderBody:[...order.orderBody,newProduct ]})

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
