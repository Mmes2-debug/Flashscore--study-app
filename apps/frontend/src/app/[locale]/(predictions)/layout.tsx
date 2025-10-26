import React from 'react';

export default function PredictionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="predictions-app">
      <div className="bg-gradient-to-br from-purple-900/20 via-slate-900/20 to-purple-900/20 min-h-screen">
        {children}
      </div>
    </div>
  );
}
