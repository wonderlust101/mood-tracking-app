import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { type AuthFields, authSchema } from "@/features/auth/schema/authSchema.ts";
import { login, createAccount } from "@/api/auth.ts";
import { useQueryClient } from "@tanstack/react-query";
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

    async function handleLogin(data: AuthFields) {
        try {
            await login(data);
            await queryClient.invalidateQueries({queryKey : ["me"]});

            navigate("/");
        } catch(error) {
            let message = "Something went wrong. Please try again later.";

            if (isAxiosError(error) && error.response?.status === 401)
                message = "That email or password doesn’t seem right. Please double check and try again.";
            else if (error instanceof Error)
                console.error("Unexpected error:", error.message);
            else
                console.error("Unknown error:", error);

            setError("root", {message});
        }
    }

    async function handleRegister(data: AuthFields) {
        try {
            await createAccount(data);
            await queryClient.invalidateQueries({queryKey : ["me"]});

            navigate("/");
        } catch(error) {
            let message = "Something went wrong. Please try again later.";

            if (isAxiosError(error) && error.response?.status === 409)
                message = "An account may already exist with that email. Try logging in or resetting your password.";
            if (error instanceof Error)
                console.error("Unexpected error:", error.message);
            else
                console.error("Unknown error:", error);

            setError("root", {message});
        }
    }

    return {
        register,
        handleSubmit,
        setError,
        errors,
        isSubmitting,
        handleLogin,
        handleRegister
    };
}