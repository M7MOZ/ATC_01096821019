/* eslint-disable react/prop-types */
import { BrowserRouter } from "react-router-dom"
import { AppProvider } from "../context/AppContext"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
function MainProvider({children}) {
    const queryClient = new QueryClient();
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <AppProvider>
                    {children}                
                </AppProvider>
            </QueryClientProvider>  
        </BrowserRouter>
    )
}

export default MainProvider