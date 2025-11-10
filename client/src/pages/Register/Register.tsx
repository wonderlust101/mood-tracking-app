import { useAuth } from "@/features/auth/hooks/useAuth.ts";
import AuthForm from "@/features/auth/components/AuthForm";

function Register() {
    const {register, handleSubmit, errors, isSubmitting, handleRegister} = useAuth();

    return (
        <AuthForm
            header="Create an account"
            subHeader="Join to track your daily mood and sleep with ease."
            onSubmit={handleSubmit(handleRegister)}
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            buttonText="Sign Up"
            footerText="Already got an account?"
            footerLink="Log in."
            footerLinkTo="/login"
        />
    );
}

export default Register;