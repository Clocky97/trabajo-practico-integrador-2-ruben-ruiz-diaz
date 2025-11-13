import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";

export default function PublicRoute({ children }) {
  const [auth, setAuth] = useState({
    loading: true,
    ok: false,
  });

  useEffect(() => {
    let isMounted = true;

    const verifySession = async () => {
      try {
        const res = await fetch("/api/profile", {
          credentials: "include",
        });

        if (isMounted) {
          if (res.ok) {
            setAuth({ loading: false, ok: true }); // usuario logueado
          } else {
            setAuth({ loading: false, ok: false }); // no logueado
          }
        }
      } catch (error) {
        if (isMounted) {
          setAuth({ loading: false, ok: false });
        }
      }
    };

    verifySession();

    return () => {
      isMounted = false;
    };
  }, []);

  if (auth.loading) return <Loading label="Preparando..." />;

  if (auth.ok) return <Navigate to="/home" replace />;

  return children;
}
