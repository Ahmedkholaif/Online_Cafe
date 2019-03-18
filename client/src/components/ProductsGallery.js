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
        {({order,users,products,setOneOrder,setOrderBody ,updateTotal,setSearchWord}  )=>( 
         <Container >
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
              <Row className ="productsGallary bg-light border-primary" >  
             
                { products.filter(prod=> prod.isAvailable )
                  .map (product =>
                     <Col sm="3">
                     <div className="card-deck">
                              
                    <Card className="p-2 m-2 rounded ">
                      <CardImg top width="100%"  src={product.image} alt="Card image cap" />
                      <CardBody className="p-0 m-0" >
                        <CardTitle > {product.productName}</CardTitle>
                        <CardText>EGP {product.price}</CardText>
                        
                        <Button onClick={ (event)=>{  
                          const products = order.orderBody.map(prod=> prod.productName) ;
                          if(! products.includes(product.productName) ) {
                           const newProduct={
                             productName:product.productName,
                             price:product.price,
                             quantity:'1',
                             image:product.image,
                            }
                            setOneOrder({...order,orderBody:[...order.orderBody,newProduct ]})
                          }else {
                           order.orderBody.map(prod =>
                             prod.productName === product.productName ? {...prod,quantity:prod.quantity++} : prod 
                             )
                             setOneOrder({...order});
                          }

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
