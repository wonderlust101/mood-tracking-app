import { useAuthQuery } from "@/features/auth/hooks/useAuthQuery.ts";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const {data, isLoading, isError} = useAuthQuery();

    useEffect(() => {
        if (!isLoading) {
            if (data)
                console.log("User is logged in");
            else if (isError)
                console.log("Error fetching user data");
        }
    }, [isLoading, data, isError])

    if (isLoading) return <p>Loadings...</p>
    if (!data) return <Navigate to="/login" replace/>

    return (
        data ? <Outlet/> : <Navigate to="/login" replace/>
    );
}

export default ProtectedRoute;