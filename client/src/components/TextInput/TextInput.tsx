import { type FieldError, type UseFormRegisterReturn } from "react-hook-form";
import styles from "./TextInput.module.css";
import type { InputHTMLAttributes } from "react";
import FormMessage from "@/components/FormError";

type InputProps = InputHTMLAttributes<HTMLInputElement>&{
    id: string
    label?: string;
    register: UseFormRegisterReturn;
    error?: FieldError;
    linkLabel?: string;
    className?: string;
    showErrors?: boolean;
}

export default function TextInput({id, label, register, error, linkLabel, className, showErrors = true, ...rest}: InputProps) {
    return (
        <div className={styles.inputContainer}>
            <div className={styles.input}>
                {label &&
                    <div className={styles.label}>
                        <label className="body-lg-regular" htmlFor={id}>{label}</label>
                    </div>
                }

                <input className={`body-md normal ${error ? styles.error : ""} ${className ?? ""}`} id={id} {...register} {...rest}/>
            </div>

            {error && showErrors && <FormMessage isError message={error.message}/>}
        </div>
    );
}