import { Component, ErrorInfo, ReactNode, Suspense } from 'react';
import {PageLoader} from "@widgets/PageLoader/ui/PageLoader.tsx";
import {PageError} from "@widgets/PageError/ui/PageError.tsx";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log('Uncaught error:', error, errorInfo);
    }

    public render() {

        const {children} = this.props;
        const {hasError} = this.state;
        if (hasError) {
            return <Suspense fallback={<PageLoader/>}><PageError/></Suspense>;
        }

        return children;
    }
}

export default ErrorBoundary;
