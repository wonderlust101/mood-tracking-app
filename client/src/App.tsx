import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainApp from "@/pages/MainApp";
import AppLayout from "@/layout/AppLayout";
import AuthLayout from "@/layout/AuthLayout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ProtectedRoute from "@/layout/ProtectedRoute";

function App() {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
                <Route element={<AuthLayout/>}>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/register"} element={<Register/>}/>
                </Route>

                <Route element={<ProtectedRoute/>}>
                    <Route element={<AppLayout/>}>
                        <Route path={"/"} element={<MainApp/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
