import type { FormEvent, ReactNode } from "react";

type FormProps = {
    children: ReactNode;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    className?: string;
};

function Form({children, onSubmit, className}: FormProps) {
    return (
        <form onSubmit={onSubmit} className={className}>
            {children}
        </form>
    );
}

export default Form;