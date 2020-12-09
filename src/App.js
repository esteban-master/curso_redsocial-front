import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import AuthProvider from "./auth/context/contextAuth";
import { ReactQueryDevtools } from "react-query-devtools";
import { ReactQueryConfigProvider } from "react-query";

function App() {
  return (
    <AuthProvider>
      <ReactQueryDevtools initialIsOpen />
      <ReactQueryConfigProvider
        config={{
          queries: {
            // staleTime: 60000,
          },
        }}
      >
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ReactQueryConfigProvider>
    </AuthProvider>
  );
}

export default App;
