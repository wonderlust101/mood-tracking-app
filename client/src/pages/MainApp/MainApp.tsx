import styles from "./MainApp.module.css";
import { logout } from "@/api/auth.ts";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function MainApp() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        queryClient.removeQueries({queryKey: ["me"]});

        navigate("/login");
    }

    return (
        <div className={styles.mainApp}>
            <p>Main App</p>
            <button onClick={handleLogout} type="button">Logout</button>
        </div>
    );
}

export default MainApp;