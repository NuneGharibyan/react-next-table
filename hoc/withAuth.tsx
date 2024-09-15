import { Spinner } from "@/app/ui";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect, useState } from "react";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return function Component(props: P) {
    const router = useRouter();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("auth-token");

      if (!token) {
        router.replace("/login");
      } else {
        setIsAuthenticated(true);
      }
    }, [router]);

    if (!isAuthenticated) {
      return <Spinner />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
