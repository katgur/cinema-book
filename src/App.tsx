import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MoviesList from "./components/MoviesList";
import MovieDetails from "./components/MovieDetails";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MovieDetails id={238} />
      <MoviesList />
    </QueryClientProvider>
  );
}

export default App;
