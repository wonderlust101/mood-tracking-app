import { Link } from "react-router-dom";
import Form from "@/components/Form";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import FormMessage from "@/components/FormError";
import styles from "./AuthForm.module.css";

type AuthFormProps = {
    header: string;
    subHeader: string;
    onSubmit: (data: any) => void;
    register: any;
    errors: Record<string, any>;
    isSubmitting: boolean;
    passwordAutoComplete?: "new-password" | "current-password";
    buttonText: string;
    footerText: string;
    footerLink: string;
    footerLinkTo: string;
}

function AuthForm({
                      header,
                      subHeader,
                      onSubmit,
                      register,
                      errors,
                      isSubmitting,
                      passwordAutoComplete,
                      buttonText,
                      footerText,
                      footerLink,
                      footerLinkTo
                  }: AuthFormProps) {
    return (
        <>
            <div className={styles.header}>
                <h2 className="heading-md">{header}</h2>
                <p className="body-lg">{subHeader}</p>
            </div>

            <Form onSubmit={onSubmit} className={styles.form}>
                <div id="input-group">
                    <TextInput
                        id="email"
                        label="Email Address"
                        type="text"
                        placeholder="name@mail.com"
                        autoComplete="email"
                        register={register("email")}
                        error={errors.email}
                    />

                    <TextInput
                        id="password"
                        label="Password"
                        type="password"
                        autoComplete={passwordAutoComplete}
                        register={register("password")}
                        error={errors.password}
                    />
                </div>

                <div>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : buttonText}
                    </Button>

                    {errors.root && <FormMessage isError message={errors.root.message}/>}
                </div>
            </Form>


            <p className="text-center">{footerText} <Link className={styles.link} to={footerLinkTo}>{footerLink}</Link></p>
        </>
    );
}

export default AuthForm;