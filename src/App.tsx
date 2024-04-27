import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MoviesList from "./components/MoviesList";
import MovieDetails from "./components/MovieDetails";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="" element={<MoviesList />} />
          <Route path="/:id" element={<MovieDetails />} />
        </Routes>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
