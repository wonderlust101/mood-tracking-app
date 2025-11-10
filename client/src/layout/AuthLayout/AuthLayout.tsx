import { Navigate, Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";
import Logo from '@/assets/images/logo.svg?react';
import { useAuthQuery } from "@/features/auth/hooks/useAuthQuery.ts";
import { useEffect } from "react";

function AuthLayout() {
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
    if (data) return <Navigate to="/" replace/>

    return (
        <div className={`${styles.authLayout}`}>
            <header className={styles.header} id="auth-header">
                <Logo role="img" aria-label="Mood Tracker Logo" />
                <h1 className="sr-only">Mood Tracker</h1>
            </header>

            <main className={ styles.authContainer} id="auth-main">
                <Outlet context={ {formStyles: styles.form}}/>
            </main>
        </div>
    );
}

export default AuthLayout;