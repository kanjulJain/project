import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function CreatePost()
{
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem("jwtToken"))
        {
            navigate('/login');
        }
    },[])


    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    
    const handleTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleContent = (event) => {
        setContent(event.target.value);
    }

    const handleForm =  async (event) => {
        try
        {
            event.preventDefault();
            const res = await axios.post("http://localhost:3001/posts", {
                title : title,
                content : content
            },
            {
                headers : {
                    authorization : "Bearer " + localStorage.getItem("jwtToken")
                }
            })

            if(res.status === 201)
            {
                navigate('/posts');
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
            <h1>Create Post: </h1><br></br>
            <form onSubmit={handleForm}>
                <label>Title</label>
                <input type = 'text' value = {title} onChange={handleTitle}></input><br></br>
                <label>Content: </label><br></br>
                <textarea rows="4" cols="50" value={content} onChange={handleContent}></textarea><br></br>
                <button>submit</button>
            </form>
        </div>
    );
}