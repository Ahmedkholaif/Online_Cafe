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
              <Col sm="3"  >
               <div>
                        
              <Card >
                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                <CardBody>
                  <CardTitle>Card title</CardTitle>
                  
                  <CardText>Price</CardText>
                  <Button>Button</Button>
                </CardBody>
              </Card>
              </div>
              </Col>  
   

              </Row>




         </Container>
       





        )}
        </AdminContext.Consumer>
        );




  }










//   return (
//     <div>
//       <Card>
//         <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
//         <CardBody>
//           <CardTitle>Card title</CardTitle>
//           <CardSubtitle>Card subtitle</CardSubtitle>
//           <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
//           <Button>Button</Button>
//         </CardBody>
//       </Card>
//     </div>
//   );
// };
}
export default ProductsGallery;
