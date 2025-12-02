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
            <Layout showNavbar={true}>
              <OneExportDashboard />
            </Layout>
          } />
          <Route path="/documentation" element={
            <Layout showNavbar={true}>
              <Documentation />
            </Layout>
          } />
          <Route path="/insurance" element={
            <Layout showNavbar={true}>
              <Insurance />
            </Layout>
          } />
          <Route path="/buyers" element={
            <Layout showNavbar={true}>
              <Buyers />
            </Layout>
          } />
          <Route path="/analytics" element={
            <Layout showNavbar={true}>
              <Analytics />
            </Layout>
          } />
          <Route path="/training" element={
            <Layout showNavbar={true}>
              <Training />
            </Layout>
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
