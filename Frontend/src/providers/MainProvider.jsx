/* eslint-disable react/prop-types */
import { BrowserRouter } from "react-router-dom"
import { AppProvider } from "../context/AppContext"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
function MainProvider({children}) {
    const queryClient = new QueryClient();
    return (
        <BrowserRouter>
            <AppProvider>
                <QueryClientProvider client={queryClient}>
                    {children}                
                </QueryClientProvider>  
            </AppProvider>
        </BrowserRouter>
    )
}

export default MainProvider