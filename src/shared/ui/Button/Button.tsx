import s from './Button.module.scss';
import { ButtonHTMLAttributes, FC } from 'react';
import classNames from "classnames";
// import React from 'react';

export enum ButtonTheme {
    // CLEAR = 'clear',
    // CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    // BACKGROUND = 'background',
    // BACKGROUND_INVERTED = 'backgroundInverted'
}

// export enum ButtonSize {
//     M = 'sizeM',
//     L = 'sizeL',
//     XL = 'sizeXl',
// }

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonTheme;
    square?: boolean;
    // size?: ButtonSize;
    disabled?: boolean
}
export const Button: FC<ButtonProps> = (props) => {
    const { className, children, theme = ButtonTheme.OUTLINE, square,  disabled, ...otherProps } = props;

    const mods: Record<string, boolean> = {
        [s.square]: !!square,
        [s.disabled]: !!disabled,
    };
    return (
        <button
            className={classNames(s.button, mods, [className, s[theme]])}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
};
