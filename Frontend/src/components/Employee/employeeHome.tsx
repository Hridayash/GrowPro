import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavEmployee from "../Navigation/navEmployee";

// Define a type for the user state
type User = string | null;

// Define a type for the error object
interface AxiosError {
  response?: {
    status: number;
  };
}

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

                const response = await axios.get<{ Name: string }>('https://growpro.onrender.com/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(response.data.Name);

            } catch (err) {
                const error = err as AxiosError;
                console.log(error);
                if (error.response && error.response.status === 401) {
                    console.log('Unauthorized');
                    navigate('/login');
                } else {
                    console.log("Data cannot be fetched");
                }
            }
        };

        fetchUserDetail();
    }, [navigate]);

    return (
        <>
            <NavEmployee name={user || "Guest"} /> {/* Provide a default name if `user` is null */}
            <div className="flex">
                <main className="p-6 ml-60 mt-12">
                    <h1>Hello <strong>{user || "Guest"}</strong>, this is the home page for employees.</h1>
                </main>
            </div>
        </>
    );
}
