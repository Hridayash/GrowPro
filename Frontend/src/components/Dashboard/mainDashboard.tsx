import { useEffect, useState } from "react";
import EmployeeDashboard from "./employee";
import ManagerDashboard from "./manager";
import axios from "axios";
import HrDashboard from "./hrDashboard";

export default function MainDashboard() {
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchUserDetail = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    throw new Error("No access token found");
                }
                
                const response = await axios.get("https://growpro.onrender.com/user", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setRole(response.data.Role);
            } catch (err) {
                setError(err as Error); // Cast error to Error type
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetail();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    let activeDashboard;
    switch (role) {
        case "hr":
            activeDashboard = <HrDashboard />;
            break;
        case "manager":
            activeDashboard = <ManagerDashboard />;
            break;
        case "employee":
            activeDashboard = <EmployeeDashboard />;
            break;
        default:
            activeDashboard = <div>No dashboard available for this role</div>;
            break;
    }

    return (
        <div>
            {activeDashboard}
        </div>
    );
}
