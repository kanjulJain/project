import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./register.css"
export default function Register()
{
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleForm =  async (event) => {
        try{
            event.preventDefault();
            const res = await axios.post("http://localhost:3001/register", {
                username : username,
                password : password
            })
            if(res.status === 201)
            {
                navigate('/login');
            }
        }
        catch(error)
        {
            return (
                <h1>{error}</h1>
            )
        }
    }

    return (
        <div>
            <h1>register</h1>
            <form onSubmit={handleForm}>
                <label>UserName</label>
                <input type = 'text' value = {username} onChange={handleUsername}></input><br></br>
                <label>Password</label>
                <input type = 'password' value = {password} onChange={handlePassword}></input><br></br>
                <button>submit</button>
            </form>
        </div>
    );
}