import { useEffect, useState } from "react";
import AdminDashboard from "./admin";
import EmployeeDashboard from "./employee";
import ManagerDashboard from "./manager";
import axios from "axios";
import HrDashboard from "./hrDashboard";

export default function MainDashboard() {
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetail = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await axios.get("http://localhost:3002/user", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setRole(response.data.Role);
            } catch (err) {
                setError(err);
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
            activeDashboard = <HrDashboard/>;
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
        <>
            {activeDashboard}
        </>
    );
}
