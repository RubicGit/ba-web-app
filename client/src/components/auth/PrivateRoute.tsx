import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const user = useUser(); // from context/store
  if (!user) return <Navigate to="/login" />;
  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
