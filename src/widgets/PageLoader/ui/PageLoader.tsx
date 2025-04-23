import s from './PageLoader.module.scss';
import classNames from "classnames";
import {Loader} from "@shared/ui/Loader/Loader.tsx";
interface PageLoaderProps  {
    className?: string
}
export const PageLoader = ({className}:PageLoaderProps) => {
    return (
        <div className={classNames(s.pageLoader,{},[className])}>
            <Loader/>
        </div>
    );
};