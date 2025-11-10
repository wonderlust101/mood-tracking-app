import styles from "./MainApp.module.css";
import { useAuth } from "@/features/auth/hooks/useAuth.ts";

function MainApp() {
    const {handleLogout} = useAuth()

    return (
        <div className={styles.mainApp}>
            <p>Main App</p>
            <button onClick={handleLogout} type="button">Logout</button>
        </div>
    );
}

export default MainApp;