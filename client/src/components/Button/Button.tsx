import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import styles from "./Button.module.css";
import { Link } from "react-router-dom";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: ReactNode;
    to?: string;
}

export default function Button({children, to, ...rest}: ButtonProps) {
    if (to)
        return (
            <Link to={to} className={`${styles.button} body-lg-semibold medium`}>
                {children}
            </Link>
        );

    return (
        <button {...rest} className={`${styles.button} body-lg-semibold medium`}>
            {children}
        </button>
    );
}