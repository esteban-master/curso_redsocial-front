import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import AuthProvider from "./auth/context/contextAuth";
import { ReactQueryDevtools } from "react-query-devtools";
import {
  ReactQueryCacheProvider,
  ReactQueryConfigProvider,
  QueryCache,
} from "react-query";

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      // refetchOnWindowFocus: ,
      retry: 1,
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <ReactQueryDevtools initialIsOpen />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ReactQueryCacheProvider>
    </AuthProvider>
  );
}

export default App;
