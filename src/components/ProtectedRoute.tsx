import React from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-light to-secondary-light">
        <div className="bg-white rounded-xl shadow-premium p-8 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-primary">Login Required</h2>
          <p className="mb-6 text-muted-foreground">You must be logged in to access this page.</p>
          <a href="/auth">
            <button className="bg-primary text-white px-6 py-2 rounded shadow-soft hover:bg-primary-hover transition font-semibold text-lg">Login</button>
          </a>
        </div>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-light to-secondary-light">
        <div className="bg-white rounded-xl shadow-premium p-8 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-primary">Login Required</h2>
          <p className="mb-6 text-muted-foreground">You must be logged in to access this page.</p>
          <a href="/auth">
            <button className="bg-primary text-white px-6 py-2 rounded shadow-soft hover:bg-primary-hover transition font-semibold text-lg">Login</button>
          </a>
        </div>
      </div>
    );
  }
  return <>{children}</>;
};

export default ProtectedRoute;
