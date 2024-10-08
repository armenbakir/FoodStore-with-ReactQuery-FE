import NavBar from "@components/NavBar";
import "./App.css";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CartProvider } from "@Context/CartContext";

const queryClient = new QueryClient();

function App() {
  return (
    <CartProvider>
      <QueryClientProvider client={queryClient}>
        <NavBar />
        <Outlet />
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </CartProvider>
  );
}

export default App;
