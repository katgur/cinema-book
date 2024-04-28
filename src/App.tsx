import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MoviesList from "./components/MoviesList";
import MovieDetailsView from "./components/MovieDetails";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="" element={<MoviesList />} />
            <Route path="/:id" element={<MovieDetailsView />} />
          </Routes>
        </QueryClientProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
