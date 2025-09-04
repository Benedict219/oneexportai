import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import OneExportDashboard from "./pages/OneExportDashboard";
import Documentation from "./pages/Documentation";
import Insurance from "./pages/Insurance";
import Buyers from "./pages/Buyers";
import Analytics from "./pages/Analytics";
import Logistics from "./pages/Logistics";
import Training from "./pages/Training";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Layout showNavbar={true}>
              <Index />
            </Layout>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <OneExportDashboard />
            </ProtectedRoute>
          } />
          <Route path="/documentation" element={
            <ProtectedRoute>
              <Layout showNavbar={true}>
                <Documentation />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/insurance" element={
            <ProtectedRoute>
              <Layout showNavbar={true}>
                <Insurance />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/buyers" element={
            <ProtectedRoute>
              <Layout showNavbar={true}>
                <Buyers />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute>
              <Layout showNavbar={true}>
                <Analytics />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/logistics" element={
            <ProtectedRoute>
              <Layout showNavbar={true}>
                <Logistics />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/training" element={
            <ProtectedRoute>
              <Layout showNavbar={true}>
                <Training />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/auth" element={<AuthPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
