import React from 'react';

type ContentLayoutProps = {
  children: React.ReactNode;
  title?: string;
};

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
  return (
    <div
      className="container pt-5"
      style={{
        height: "calc(100vh - 80px)", // header ≈ 70-80px
        display: "flex",
        flexDirection: "column",
      }}
    >
      {title ? (
        <h1 className="display-5 mb-3" style={{ flexShrink: 0 }}>
          {title}
        </h1>
      ) : null}

      {/* Zone scrollable */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingRight: "6px",
        }}
      >
        {children}
      </div>
    </div>
  );
};
