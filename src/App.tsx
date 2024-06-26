import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string;
}

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get<IPost[]>(
                    "/posts",
                );
                setPosts(response.data);
            } catch (error) {
                console.log('error',error);
                setError(JSON.stringify(error));
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Error: {error}</div>;

    if (posts!.length === 0) return <p>No posts available.</p>;

    const handleDelete = (id: number) => {
        setPosts((prev) => prev.filter((item) => item.id !== id));
        axios.delete("https://jsonplaceholder.typicode.com/posts/" + id);
    };

    return (
        <ul className="post-wrapper">
            {posts!.map((post) => (
                <li key={post.id} className="post-card">
                    <Link to={`/${post.id}`}>{post.title}</Link>
                    <button onClick={() => handleDelete(post.id)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                        >
                            <g fill="none">
                                <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                                <path
                                    fill="currentColor"
                                    d="M20 5a1 1 0 1 1 0 2h-1l-.003.071l-.933 13.071A2 2 0 0 1 16.069 22H7.93a2 2 0 0 1-1.995-1.858l-.933-13.07A1.017 1.017 0 0 1 5 7H4a1 1 0 0 1 0-2zm-6-3a1 1 0 1 1 0 2h-4a1 1 0 0 1 0-2z"
                                />
                            </g>
                        </svg>
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default App;
