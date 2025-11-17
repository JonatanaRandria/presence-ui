import { PageSpinner } from "@/components/Element/Spinner/PageSpinner";
import { useInitAuth } from "../hooks/useInitAuth";


type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { isLoading } = useInitAuth();

  if (isLoading) {
    return <PageSpinner />;
  }

  return <>{children}</>;
};
