import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { Switch, Route } from "wouter";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { queryClient } from "@/lib/queryClient";
import Index from "./pages/Index";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import ClientDashboard from "./pages/ClientDashboard";
import ProgramView from "./pages/ProgramView";
import WeekDetail from "./pages/WeekDetail";
import SessionDetail from "./pages/SessionDetail";
import Journal from "./pages/Journal";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUpdateSessions from "@/pages/AdminUpdateSessions";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";
import PublicSessionDetail from "./pages/PublicSessionDetail";
import Purchase from "./pages/Purchase";
import Welcome from "./pages/Welcome";
import Habits from "./pages/Habits";
import Schedule from "./pages/Schedule";
import WorkIt from "./pages/WorkIt";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Index} />
      <Route path="/auth/signin" component={SignIn} />
      <Route path="/auth/signup" component={SignUp} />
      <Route path="/auth/forgot-password" component={ForgotPassword} />
      <Route path="/auth/reset-password" component={ResetPassword} />
      <Route path="/share/sessions/:sessionId" component={PublicSessionDetail} />
      <Route path="/purchase">
        <ProtectedRoute><Purchase /></ProtectedRoute>
      </Route>
      <Route path="/welcome">
        <ProtectedRoute requireAccess><Welcome /></ProtectedRoute>
      </Route>
      <Route path="/habits">
        <ProtectedRoute requireAccess><Habits /></ProtectedRoute>
      </Route>
      <Route path="/schedule">
        <ProtectedRoute requireAccess><Schedule /></ProtectedRoute>
      </Route>
      <Route path="/work-it">
        <ProtectedRoute><WorkIt /></ProtectedRoute>
      </Route>
      <Route path="/app">
        <ProtectedRoute><ClientDashboard /></ProtectedRoute>
      </Route>
      <Route path="/programs/:programId">
        {(params) => <ProtectedRoute><ProgramView /></ProtectedRoute>}
      </Route>
      <Route path="/programs/:programId/weeks/:weekId">
        {(params) => <ProtectedRoute requireAccess><WeekDetail /></ProtectedRoute>}
      </Route>
      <Route path="/sessions/:sessionId">
        {(params) => <ProtectedRoute requireAccess><SessionDetail /></ProtectedRoute>}
      </Route>
      <Route path="/journal">
        <ProtectedRoute><Journal /></ProtectedRoute>
      </Route>
      <Route path="/community">
        <ProtectedRoute><Community /></ProtectedRoute>
      </Route>
      <Route path="/how-it-works">
        <ProtectedRoute><HowItWorks /></ProtectedRoute>
      </Route>
      <Route path="/profile">
        <ProtectedRoute><Profile /></ProtectedRoute>
      </Route>
      <Route path="/admin">
        <ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>
      </Route>
      <Route path="/admin-update-sessions">
        <ProtectedRoute requireAdmin><AdminUpdateSessions /></ProtectedRoute>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <Router />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
