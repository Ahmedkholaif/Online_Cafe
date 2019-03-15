import React , {Component }from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button ,Container,Row,Col,Input} from 'reactstrap';
  import {UserContext}from './UserContext'
class UserProductsGallery extends Component {

  render()
  {
      return(

        <UserContext.Consumer>
        {({order,products,setOneOrder,setOrderBody}  )=>( 
         <Container >
              <Row   className="p-2">  
                 
              </Row>
              <hr/>
              <Row  className="p-3" >  
              <div>
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
                          
                         const products = order.orderBody.map(prod=> prod.productName) ;
                         if(! products.includes(product.productName) ) {
                          const newProduct={
                            productName:product.productName,
                            price:product.price,
                            quantity:'1'
                           }
                           setOneOrder({...order,orderBody:[...order.orderBody,newProduct ]})
                         }else {
                          order.orderBody.map(prod =>
                            prod.productName === product.productName ? {...prod,quantity:prod.quantity++} : prod 
                            )
                            setOneOrder({...order});
                         }
                             
                            
                        }}
                         > Add </Button>
                      </CardBody>
                    </Card>
                    </div>
                    </Col>  
 
                )}
              </Row>
         </Container>
        )}
        </UserContext.Consumer>
        );
  }
}
export default UserProductsGallery;
