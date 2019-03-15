import React, { Component } from "react";
import { Row, Col,Input,Table ,Container,Pagination,PaginationItem,PaginationLink} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';
import "../css/CategoryBooksName.css";
import CustomPagination from "./pagination";
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

  toggle = (user)=>{
    this.setState({ collapse: this.state.collapse === user ? null : user });
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
        <Input className="col-2 "  type="select" >
          <option> Users </option>
          {
            users.map(user=>(
              <option value={user.fullName}>{user.fullName}</option>
            ))
          }
          </Input>
        From<Input className="col-2 " onChange={(e)=>{
          console.log(new Date(e.target.value),new Date());
        }} type="date" /> To  <Input placeholder="To" className="col-2 " type="date" />
        </Row>
        <Row id="displayedItems">
        
        <Table className="table-striped mt-5 col-9 ml-2">
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
                <UserOrders key={index} 
                user={users[key]}
                isOpen={this.state.collapse === users[key]}
                toggle={this.toggle}
                />
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
      </>
    
    )}
           
      </AdminContext.Consumer>
    );
  }
}

export default ChecksView;
