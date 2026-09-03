import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContexts";


export function LandingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to Our SaaS</h1>
      <p>A production-ready application built with NestJS and React</p>
      {!isAuthenticated ? (
        <div>
          <Link to="/login" style={{ marginRight: "10px" }}>
            Login
          </Link>
          <Link to="/register">Register</Link>
        </div>
      ) : (
        <Link to="/dashboard">Go to Dashboard</Link>
      )}
    </div>
  );
}