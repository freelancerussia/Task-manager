import { ChangeEvent, InputHTMLAttributes, memo } from 'react';
import s from './Input.module.scss';
import classNames from "classnames";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
    className?: string
    value?: string
    onChange?: (value: string) => void
    type?: string
}
export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        ...otherProps
    } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <div className={classNames(s.input, {}, [className])}>
            <input onChange={onChangeHandler} type={type} value={value} {...otherProps} />
        </div>
    );
});