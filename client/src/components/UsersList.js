import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem ,Form , Label , Input} from 'reactstrap';
import { EventEmitter } from 'events';
import './UsersList.css'
class UsersList extends React.Component {

    constructor(props){
        super(props);
        this.state={
            usersList:'',
            selectedUserId:''
        }

        this.handleSelectedUser=this.handleSelectedUser.bind(this);
        this.handleChange=this.handleChange.bind(this);

     }

    // componentWillReceiveProps(){
    //     this.setState({users:this.props.usersList});
    //     console.log(this.state.usersList);
    // }

    handleSelectedUser = event =>
    {

        //console.log("handleSelectedUser clicked")
        //console.log(event.target.value)

        this.props.setSelectedUser(event.target.value);
    }
    handleChange(event){
        this.setState({
            selectedUserId:event.target.value
        });
        console.log('selected:',event.target.value);
    }


    render()
    {
        const usersList=this.props.usersList;
        console.log(usersList);
        
        const  viewAllUsers = usersList.length ? usersList.map(user =>  
                <option  key={user.id} value={user.fullName}>
                {user.fullName}
                </option>
        
        ) : console.error("no users");

      
        
        return(
            <div>
                <h1>Add to user:</h1>
                <Form>
                <Label for="userSelect"></Label>
                <Input type="select" name="select" id="userSelect" onChange={this.handleSelectedUser} value={this.state.value} className="mainselection" >
                    {
                        viewAllUsers
                    }   
                </Input>
                </Form>
            </div>
        );  
    }
}

/////////////////


export default UsersList;


