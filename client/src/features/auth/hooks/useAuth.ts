import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { type AuthFields, authSchema } from "@/features/auth/schema/authSchema";
import { login, createAccount, logout } from "@/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function useAuth() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {
              register,
              handleSubmit,
              setError,
              formState : {errors, isSubmitting}
          } = useForm<AuthFields>({
        resolver : zodResolver(authSchema)
    });

    const loginMutation = useMutation({
        mutationFn : login,
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ["me"]});
            navigate("/");
        },
        onError : (error: unknown) => {
            let message = "Something went wrong. Please try again later.";
            if (isAxiosError(error) && error.response?.status === 401) {
                message = "That email or password doesn’t seem right. Please double check and try again.";
            } else if (isAxiosError(error) && error.response?.status === 0) {
                message = "Network Error. Please check your internet connection and try again.";
            }
            setError("root", {message});
        }
    });

    const registerMutation = useMutation({
        mutationFn : createAccount,
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ["me"]});
            navigate("/");
        },
        onError : (error: unknown) => {
            let message = "Something went wrong. Please try again later.";
            if (isAxiosError(error) && error.response?.status === 409) {
                message = "An account may already exist with that email. Try logging in or resetting your password.";
            } else if (isAxiosError(error) && error.response?.status === 0) {
                message = "Network Error. Please check your internet connection and try again.";
            }
            setError("root", {message});
        }
    });

    const logoutMutation = useMutation({
        mutationFn : logout,
        onSuccess : () => {
            queryClient.removeQueries({queryKey : ["me"]});
            navigate("/login");
        },
        onError : (error: unknown) => {
            console.error("Logout error:", error);
        }
    });

    const handleLogin = (data: AuthFields) => loginMutation.mutate(data);
    const handleRegister = (data: AuthFields) => registerMutation.mutate(data);
    const handleLogout = () => logoutMutation.mutate();

    return {
        register,
        handleSubmit,
        setError,
        errors,
        isSubmitting,
        handleLogin,
        handleRegister,
        handleLogout
    };
}