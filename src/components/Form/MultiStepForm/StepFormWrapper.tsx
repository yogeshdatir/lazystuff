import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

const StepFormWrapper = ({ title, children }: Props) => {
  return (
    <div>
      <h2 style={{ textAlign: "center", margin: 0, marginBottom: "2rem" }}>
        {title}
      </h2>
      <div
        style={{
          display: "grid",
          gap: "1rem 0.5rem",
          justifyContent: "flex-start",
          gridTemplateColumns: "auto minmax(auto, 400px)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default StepFormWrapper;
