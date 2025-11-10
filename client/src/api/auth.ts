import axios from "axios";

export type AuthDTO = {
    email : string;
    password : string;
}

const authApi = axios.create({
    baseURL : "http://localhost:3000/api/v1/auth",
    headers: {"Content-Type" : "application/json"},
    withCredentials : true
});

export async function getCurrentUser() {
    const {data} = await authApi.get("/me");
    return data;
}

export async function login(loginData : AuthDTO) {
    const {data} = await authApi.post("/login", loginData);
    return data;
}

export async function createAccount(registerData : AuthDTO) {
    const {data} = await authApi.post("/register", registerData);
    return data;
}

export async function logout() {
    await authApi.post("/logout");
}