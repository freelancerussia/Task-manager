import { Suspense } from 'react';

import { PageLoader } from '@widgets/PageLoader/ui/PageLoader';
import {Route, Routes} from "react-router";
import {routeConfig} from "@shared/config/routeConfig.tsx";

export function AppRouter() {
    return (
        <Suspense fallback={<PageLoader/>}>
            <Routes>
                {Object.values(routeConfig).map(({ path, element }) => (
                    <Route
                        key={path}
                        path={path}
                        element={<div className='page-wrapper'>{element}</div>}
                    />
                ))}
            </Routes>
        </Suspense>
    );
}
