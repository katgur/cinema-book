import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MoviesList from "./components/MoviesList";
import MovieDetailsView from "./components/MovieDetails";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="" element={<MoviesList />} />
          <Route path="/:id" element={<MovieDetailsView />} />
        </Routes>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
