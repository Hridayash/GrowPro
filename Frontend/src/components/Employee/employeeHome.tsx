import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavEmployee from "../Navigation/navEmployee";

// Define a type for the user state
type User = string | null;

export default function HomeEmployee() {
    // Initialize the user state with the User type
    const [user, setUser] = useState<User>(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('fetching user details....');

        const fetchUserDetail = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get('https://growpro.onrender.com/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(response.data.Name);

            } catch (err: any) {  // TypeScript requires the error type to be specified
                console.log(err);
                if (err.response && err.response.status === 401) {
                    console.log('unauthorized');
                    navigate('/login');
                } else {
                    console.log("data cannot be fetched");
                }
            }
        };

        fetchUserDetail();
    }, [navigate]);

    return (
        <>
            <NavEmployee name={user} />
            <div className="flex ">
                <main className="p-6 ml-60 mt-12">
                    <h1>Hello <strong>{user}</strong>, this is the home page for employees.</h1>
                </main>
            </div>
        </>
    );
}
