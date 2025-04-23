import s from './PageError.module.scss';
import  classNames from "classnames";
import Button from "@shared/ui/Button/Button.tsx";
interface PageErrorProps  {
    className?: string
}
export const PageError = ({className}:PageErrorProps) => {

    const reloadPage = () => {
        location.reload();
    };

    return (
        <div className={classNames(s.pageError,{},[className])}>
            <p>{'Произошла непредвиденная ошибка'}</p>
            <Button onClick={reloadPage}>{'Обновить страницу'}</Button>
        </div>
    );
};