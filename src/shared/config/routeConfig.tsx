import {RouteProps} from "react-router";
import {NotFoundPage} from '@pages/NotFound'
import {MainPage} from "@pages/Main";

export enum AppRoutes {
    MAIN = 'main',
    NOT_FOUND = 'not_found',

}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    // последним, чтоб охватывал все оставшиеся роуты
    [AppRoutes.NOT_FOUND]: '*',

};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },

    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
