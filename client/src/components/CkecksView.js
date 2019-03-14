import React, { Component } from "react";
import { Row, Col,Input,Table ,Container,Pagination,PaginationItem,PaginationLink} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';
import "../css/CategoryBooksName.css";
import CustomPagination from "./pagination";
import CustomNavbar from "./Navbar";
import ItemsDisplay from "./ItemsDisplay";
import axios from "axios";
import {AdminContext} from './AdminContext';
import UserOrders from './UserOrders';

class ChecksView extends Component {
  // constructor(props) {
  //   super(props);
    state = {
  //     categoryId: 1,
      activePage: 1,
      itemsCount:1,
    };

   
  // }


handelPagination = (pageNum)=>
{
      this.setState({
        // books:res.data.books,
        activePage: pageNum
      })
  }

  render() {

   
    return (

      <AdminContext.Consumer>
      {({users,orders})=>(
<>
        <Container className="col-12 p-2">
      <div>
        <h2> Ckecks Page </h2>
        <Row> 
        <Col xs="4">From<Input type="date" /> </Col><Col xs="4">To<Input type="date" /> </Col>
        </Row>
        <Row> 
          <Input className="col-4 mt-2"  type="select" >
          <option> Users </option>
          {
            users.map(user=>(
              <option value={user.fullName}>{user.fullName}</option>
            ))
          }
          </Input>
        </Row>
        <Row id="displayedItems">
        
        <Table className="table-striped mt-5">
        <thead>
            <tr>
                <th> User Name </th>
                <th>  Total Amount </th>
                <th>##</th>
                
            </tr>
        </thead>
        <tbody>

            {
                Object.keys(users).map((key, index) =>
                <UserOrders key={index} user={users[key]} />
                )
            }
            

         </tbody>
         </Table>

        </Row>
        <Row className="justify-content-md-center">
            <Col>
        

            </Col>
        </Row>
      </div>
      
      </Container>
      <Row>
      
      <Pagination size="lg" aria-label="Page navigation example">
      <PaginationItem>
        <PaginationLink first href="1" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink previous href="4" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="1">
          1
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="2">
          2
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="3">
          3
        </PaginationLink>
      </PaginationItem>
      </Pagination>
      </Row>
      </>
    
    )}
           
      </AdminContext.Consumer>
    );
  }
}

export default ChecksView;
