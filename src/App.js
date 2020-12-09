import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import AuthProvider from "./auth/context/contextAuth";
import { ReactQueryDevtools } from "react-query-devtools";

function App() {
  return (
    <AuthProvider>
      <ReactQueryDevtools initialIsOpen />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
