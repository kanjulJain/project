
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Counter from './Counter';

export default function Home() 
{
    const [display_counter, setDisplay_Counter] = useState(false);
    
    if(display_counter)
    {
        return <Counter></Counter>
    }


    return (
        <div>
            <h1>Home</h1>
            <Link to = "/login">Login</Link>
        </div>
    );
}