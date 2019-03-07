import {createContext} from 'react'


export  const AdminContext = createContext ( {
    orders :[],
    setOredrs : ()=>{},
    
    users:[],
    setUsers : ()=>{},

    products:[],
    setProducts:()=>{},

    categories:[] ,
    setCategories: ()=>{},

});