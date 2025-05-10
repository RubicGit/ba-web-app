import type { ReactNode } from "react";

interface SectionProps {
  children?: ReactNode;
}

const Section = ({ children }: SectionProps) => {
  return <div className="max-w-7xl">{children}</div>;
};

export default Section;
