import AppRoutes from "./routes";
import { LoadingProvider } from "./context/LoadingContext";
import TopProgressBar from "./components/GlobalPreloader";

function App() {
  return (
    <LoadingProvider>
      <TopProgressBar />
      <AppRoutes />
    </LoadingProvider>
  );
}

export default App;
