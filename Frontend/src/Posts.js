import React from "react";
import { useParams } from "react-router-dom";

export default function Posts()
{
    const params = useParams();

    return (
        <div>
            <h1>Posts {params.postId}</h1>
        </div>
    );
}