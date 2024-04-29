import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const Post = () => {
    const { id } = useParams<{ id: string }>(); // Get the 'id' parameter from the URL
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [post, setPost] = useState<IPost | null>(null); // Change to IPost | null

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get<IPost>(
                    `/posts/${id}`, // Use template literal for dynamic URL
                );
                setPost(response.data); // Change to setPost
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]); // Include id in the dependency array

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Error: {error}</div>;

    if (!post) return <p>No post available.</p>; // Check if post is null

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    );
}

export default Post;

