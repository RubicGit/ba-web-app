import React from "react";
import AccessDenied from "./AccessDenied";

type RoleGateProps = {
  allowed: string[];
  children: React.ReactNode;
};

export const RoleGate = ({ allowed, children }: RoleGateProps) => {
  const { role } = useUser(); // from context/store
  if (!allowed.includes(role)) return <AccessDenied />;
  return <>{children}</>;
};

export default RoleGate;
