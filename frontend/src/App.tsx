import "./App.css";
import { Routes, Route } from "react-router";
import { Other } from "./components/other/Other";
import { AuthenticatedWrapper } from "./components/auth";
import { QueryClient, QueryClientProvider } from "react-query";
import { Tasks } from "./components/tasks/Tasks";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <AuthenticatedWrapper>
            <Routes>
              <Route path="/" element={<Tasks />} />
              <Route path="/other" element={<Other />} />
            </Routes>
          </AuthenticatedWrapper>
        </QueryClientProvider>
      </div>
    </BrowserRouter>
  );
};

export default App;
