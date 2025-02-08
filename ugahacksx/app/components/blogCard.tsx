'use client'
import React, { useState, useEffect, use } from 'react';


const BlogCard = ({}) => {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    }, []);

    return (
        <div className="blog-card">
            <p>
                Blog Title
            </p>
            <p>
                Genre
            </p>
            <p>
                Author
            </p>
            <p>
                Photo
            </p>
            <p>
                Lyrics:
            </p>
            <p>
                Description:
            </p>
        </div>
    );
};

export default BlogCard;

