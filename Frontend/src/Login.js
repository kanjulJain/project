import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() 
{
    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const handleForm = async (event) => {
        try
        {
            event.preventDefault();
            const res = await axios.post("http://localhost:3001/login", {
                username: username,
                password : password
            });
    
            if(res.status === 200)
            {
                localStorage.setItem("jwtToken", res.data.token);
                navigate('/posts');
            }
        }
        catch (error)
        {
            setLoginError("Incorrect Credentials");
        }
    }

    const handleUsername = (event) => {
        console.log(event);
        setUserName(event.target.value);
        setLoginError("");
    }
    
    const handlePassword = (event) => {
        console.log(event);
        setPassword(event.target.value);
        setLoginError("");
    } 


    return (
        <div>
            <h1>Login</h1>
            <h3>{loginError}</h3>
            <form onSubmit={handleForm}>
                <label>Username :</label>
                <input type = 'text' value = {username} onChange={handleUsername}></input><br></br>
                <label>Password :</label>
                <input type = 'password' value = {password} onChange={handlePassword}></input><br></br>
                <button>Submit</button>
            </form>

        </div>
    );
}