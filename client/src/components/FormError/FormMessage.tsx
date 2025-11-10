import ErrorIcon from "@/assets/images/icon-info-circle.svg?react";
import styles from "./FormError.module.css";
import type { ReactNode } from "react";

type FormErrorProps = {
    message?: string|ReactNode;
    isError?: boolean;
    isSuccess?: boolean;
}

export default function FormMessage({message, isError}: FormErrorProps) {
    return (
        <div className={`${styles.formError} ${isError ? styles.error : ""}`}>
            <ErrorIcon aria-hidden={true}/>
            <p className="micro" style={{color: "var(--color-red-700)"}}>{message}</p>
        </div>
    );
}