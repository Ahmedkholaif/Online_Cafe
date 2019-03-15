import React, {Component} from "react";
import {BrowserRouter,Route} from "react-router-dom";
import AdminDashboard from './components/AdminDashboard'
import GuestHomePage from './components/GuestHomePage'
import HomePage from './components/userHomePage'
import {UserContext} from './components/UserContext';
import MyOrders from './components/MyOrders.js';

import './App.css'

class App extends Component {

    render() {
        return (
    <UserContext.Provider>            
            <BrowserRouter>
                <div className='App'>
                    <Route path="/admin/dashboard" exact component={AdminDashboard}/>
                    <Route path='/' exact component={GuestHomePage}/>
                    <Route path='/Home' exact component={HomePage}/>
                   <Route path='/myorders' exact component={MyOrders}/>
                   
                </div>
            </BrowserRouter>
            </UserContext.Provider>
        );
    }
}

export default App;
