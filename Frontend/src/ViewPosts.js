import React, { useEffect, useState } from "react";
import axias from 'axios';
import { useNavigate } from "react-router-dom";

export default function Viewport()
{
    const [apiData, setApiData] = useState([]);
    const [loading, isLoading] = useState(true);
    const [apiError, setApiError] = useState(false);
    const [ErrorType, setErrorType] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("jwtToken"))
        {
            (async () =>
            {
                try
                {
                    const response = await axias.get("http://localhost:3001/posts", {
                        headers : {
                            authorization : "Bearer " + localStorage.getItem("jwtToken")
                        }
                    });
                    setApiData(response.data);
                    isLoading(false);
                }
                catch(error)
                {
                    setErrorType(error.message);
                    setApiError(true);
                }
            })()
        }
        else
        {
            navigate('/login');
        }
    }, [])

    const create = function Create_Post()
    {
        navigate('/create_post');
    }

    const displayData = apiData.map((data) => <h4 key = {data.id}>{data.title}</h4>);

    if(apiError)
    {
        return (
            <div>
                <h1>{ErrorType}</h1>
            </div>
        ) 
    }
    if(loading)
    {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <h1>Posts: </h1>
            <form onSubmit={create}>
                <button>Create Post</button>
            </form>
            {displayData}
        </div>
    );
}
