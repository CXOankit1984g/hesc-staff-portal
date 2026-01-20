import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import GrantsScholarships from "./pages/GrantsScholarships";
import Reports from "./pages/Reports";
import StudentRecords from "./pages/StudentRecords";
import Settings from "./pages/Settings";
import Programs from "./pages/Programs";
import Documents from "./pages/Documents";
import Help from "./pages/Help";
import College from "./pages/College";
import ProgramDetail from "./pages/ProgramDetail";
import DashboardLayout from "./components/DashboardLayout";

function Router() {
  return (
    <DashboardLayout>
      <Switch>
        <Route path={"/"} component={Dashboard} />
        <Route path={"/applications"} component={Applications} />
        <Route path={"/student-records"} component={StudentRecords} />
        <Route path={"/grants-scholarships"} component={GrantsScholarships} />
        <Route path={"/program-detail"} component={ProgramDetail} />
        <Route path={"/reports"} component={Reports} />
        <Route path={"/settings"} component={Settings} />
        <Route path={"/programs"} component={Programs} />
        <Route path={"/documents"} component={Documents} />
        <Route path={"/help"} component={Help} />
        <Route path={"/college"} component={College} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </DashboardLayout>
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
