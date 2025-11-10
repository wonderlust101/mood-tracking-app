import axios from "axios";

export type UserSessionPayload = {
    userID: string;
    email: string;
}


export type AuthDTO = {
    email : string;
    password : string;
}

const authApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000/api/v1/auth",
    headers: {"Content-Type" : "application/json"},
    withCredentials : true
});

authApi.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.code === "ECONNABORTED" || err.message === "Network Error") {
            err.response = { status: 0, data: null };
        }
        return Promise.reject(err);
    }
);


export async function getCurrentUser(): Promise<UserSessionPayload | null> {
    const {data} = await authApi.get<UserSessionPayload>("/me");
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