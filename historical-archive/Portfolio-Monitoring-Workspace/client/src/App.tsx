import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import AssetsPage from "./pages/AssetsPage";
import DerivativesPage from "./pages/DerivativesPage";
import FixedIncomePage from "./pages/FixedIncomePage";
import Home from "./pages/Home";
import MacroRiskPage from "./pages/MacroRiskPage";
import MbsPage from "./pages/MbsPage";
import EquityPage from "./pages/EquityPage";
import StructuredProductsPage from "./pages/StructuredProductsPage";

/**
 * Design reminder: professional, light, and simple.
 * Routes should preserve the existing information architecture while the interface shifts to a cleaner institutional presentation.
 */
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/assets" component={AssetsPage} />
      <Route path="/assets/equity" component={EquityPage} />
      <Route path="/assets/fixed-income" component={FixedIncomePage} />
      <Route path="/assets/derivative" component={DerivativesPage} />
      <Route path="/assets/structured-products" component={StructuredProductsPage} />
      <Route path="/assets/structured-products/mbs" component={MbsPage} />
      <Route path="/macro-risk" component={MacroRiskPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
