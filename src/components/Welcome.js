import React, { useState,useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { BASE_API_URL } from '../utils/constants';
//import { AuthContext } from '../context/auth-context';
import './common.css';
const Welcome = (props) =>{

    const[formData,setformData] = useState({
        department:"",
        description:"",
        email:""
    });
    const[Errors,setErrors] = useState({});

    const handleChange = (e)=>{
         setformData({...formData,[e.target.name]:e.target.value})
    
    }
    const handleSubmit = (e)=>{
        alert('sssss')
         e.preventDefault();
         const validationError = validateFrom(formData);
         setErrors(validationError);
        
            try{
                const response = axios.post('https://jsonplaceholder.typicode.com/todos/1',formData)
                console.log(response.data)
            } catch{

            }
         

    };

    const validateFrom = (value) =>{
        let Errors = {}
        if(!value.department.trim() === 0){
            Errors.department = 'Department is Required'
        }
    }

    return(
        <form onSubmit={handleSubmit} >
          <div className='container'>
            <input 
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder='Enter Department'
            />
            {Errors.department && <span>{Errors.department}</span>}
        

         <button type="submit">Submit</button> 
         </div>  
        </form> 
    )

   
}

export default Welcome; 