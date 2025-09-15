// import dependencies
import { Navigate } from "react-router";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRouter = ({ children }: ProtectedRouteProps) => {
    // Simply check if JWT token exists - if yes, allow access
    const jwtToken = localStorage.getItem("jwt-token");

    if (!jwtToken) {
        return <Navigate to="/auth/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRouter;
