import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MoviesList from "./components/MoviesList";
import MovieDetailsView from "./components/MovieDetailsView";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import style from "./App.module.scss";

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <QueryClientProvider client={queryClient}>
          <h1 className={style.title}>
            <Link to="/">Кино справочник</Link>
          </h1>
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
