import "./App.css";
import { Routes, Route } from "react-router";
import { Home } from "./components/Home";
import { Other } from "./components/other/Other";
import { AuthenticatedWrapper } from "./components/AuthenticatedWrapper";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <AuthenticatedWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/other" element={<Other />} />
          </Routes>
        </AuthenticatedWrapper>
      </QueryClientProvider>
    </div>
  );
};

export default App;
