import { useAuth } from "@/features/auth/hooks/useAuth.ts";
import AuthForm from "@/features/auth/components/AuthForm";

function Login() {
    const {register, handleSubmit, errors, isSubmitting, handleLogin} = useAuth();

    return (
        <AuthForm
            header="Welcome back!"
            subHeader=" Log in to continue tracking your mood and sleep."
            onSubmit={handleSubmit(handleLogin)}
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            passwordAutoComplete="current-password"
            buttonText="Log In"
            footerText="Haven't got an account?"
            footerLink="Sign up."
            footerLinkTo="/register"
        />
    );
}

export default Login;