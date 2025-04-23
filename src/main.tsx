import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Index from '@app/index.tsx'
import '@app/styles/index.css'
import {StoreProvider} from "@app/providers/StoreProvider";
import ErrorBoundary from "@app/providers/ErrorBoundary/ui/ErrorBoundary.tsx";
import {BrowserRouter} from "react-router";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <StoreProvider>
          <BrowserRouter>
              <ErrorBoundary>
                  <Index />
              </ErrorBoundary>
          </BrowserRouter>
      </StoreProvider>
  </StrictMode>,
)
