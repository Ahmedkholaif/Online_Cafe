import React, {Component} from "react";
import {BrowserRouter,Route} from "react-router-dom";
// import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
import GuestHomePage from './components/GuestHomePage'
import HomePage from './components/userHomePage'

import Category from './components/CkecksView'

import './App.css'

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div className='App'>
                    <Route path="/admin/dashboard" exact component={AdminDashboard}/>
                    <Route path='/' exact component={GuestHomePage}/>
                    <Route path='/Home' exact component={HomePage}/>
                  
                    <Route path='/Category' exact component={Category}/>
                   
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
