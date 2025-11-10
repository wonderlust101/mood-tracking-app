import { useAuthQuery } from "@/features/auth/hooks/useAuthQuery";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const {data, isLoading} = useAuthQuery();

    if (isLoading) return <p>Loading...</p>
    if (!data) return <Navigate to="/login" replace/>

    return (
        <Outlet/>
    );
}

export default ProtectedRoute;