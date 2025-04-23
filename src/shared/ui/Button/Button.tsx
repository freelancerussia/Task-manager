import {ButtonHTMLAttributes, FC} from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    // theme?: ButtonTheme;
    // square?: boolean;
    // size?: ButtonSize;
    disabled?: boolean
}

const Button:FC<ButtonProps> = ({children, disabled, ...otherProps}) => {
    return (
        <button
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
};

export default Button;