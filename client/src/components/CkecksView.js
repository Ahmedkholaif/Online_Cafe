import React, { Component } from "react";
import { Row, Col,Input,Table ,Container,Pagination,PaginationItem,PaginationLink} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';
import "../css/CategoryBooksName.css";
import CustomPagination from "./pagination";
import axios from "axios";
import {AdminContext} from './AdminContext';
import UserOrders from './UserOrders';

class ChecksView extends Component {
    state = {
      user:'',
      activePage: 1,
      itemsCount:1,
      dateFrom:'',
      dateTo:'',
    };

   
  


handelPagination = (pageNum)=>
{
      this.setState({
       
        activePage: pageNum
      })
  }

  toggle = (user)=>{
    this.setState({ collapse: this.state.collapse === user ? null : user });
  }
  filterUsers=(users)=>{

    if(this.state.user !== ''){
      return users.filter(user=> user.fullName === this.state.user) 
    }else{
      return users ;
    }
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
        <Input className="col-2 "  type="select" onChange={(event)=>{
          this.setState({
            user: event.target.value
          })
        }} >
          <option> Users </option>
          {
            users.map(user=>(
              <option value={user.fullName}>{user.fullName}</option>
            ))
          }
          </Input>
          From<Input className="col-2 " onChange={(event)=>{
              this.setState({
                  dateFrom:event.target.value
              })
              console.log(event.target.value);
            }} type="date" /> To  <Input placeholder="To" className="col-2 " type="date" onChange={(event)=>{
                this.setState({
                    dateTo:event.target.value
                  }) 

            }} />

        </Row>
        <Row id="displayedItems">
        
        <Table className="table-striped mt-5 col-9 ml-2">
        <thead className="bg-secondary rounded" >
            <tr>
                <th> User Name </th>
                <th>  Total Amount </th>
                
            </tr>
        </thead>
        <tbody>

            {
                Object.keys(this.filterUsers(users)).map((key, index) =>
                <UserOrders key={index} 
                user={users[key]}
                dateFrom={this.state.dateFrom}
                dateTo={this.state.dateTo}
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
