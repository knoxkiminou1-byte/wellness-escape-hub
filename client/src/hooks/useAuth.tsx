import {
  createContext,
  useContext,
  ReactNode,
} from "react";
import { useLocation } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";

type AuthUser = {
  id: number;
  email: string;
  name: string;
  role?: string;
  hasAccess?: boolean;
};

interface AuthContextType {
  user: AuthUser | null;
  isAdmin: boolean;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ error: any }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updatePassword: (newPassword: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [, setLocation] = useLocation();

  const { data: user, isLoading, refetch } = useQuery<AuthUser | null>({
    queryKey: ["/api/auth/user"],
    retry: false,
    staleTime: Infinity,
  });

  const isAdmin = user?.role === "admin";
  const loading = isLoading;

  const signUp = async (
    email: string,
    password: string,
    name: string
  ): Promise<{ error: any }> => {
    try {
      await apiRequest("POST", "/api/auth/register", { email, password, name });
      await refetch();
      setLocation("/app");
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  };

  const signIn = async (
    email: string,
    password: string
  ): Promise<{ error: any }> => {
    try {
      await apiRequest("POST", "/api/auth/login", { email, password });
      await refetch();
      setLocation("/app");
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await apiRequest("POST", "/api/auth/logout", {});
      queryClient.clear();
      setLocation("/auth/signin");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const resetPassword = async (
    _email: string
  ): Promise<{ error: any }> => {
    return { error: null };
  };

  const updatePassword = async (
    _newPassword: string
  ): Promise<{ error: any }> => {
    return { error: null };
  };

  const effectiveUser = user ? user : null;

  return (
    <AuthContext.Provider
      value={{
        user: effectiveUser,
        isAdmin,
        loading,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }
  return context;
};
