import React from 'react';

export default function RewardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rewards-app">
      <div className="bg-gradient-to-br from-amber-900/20 via-slate-900/20 to-amber-900/20 min-h-screen">
        {children}
      </div>
    </div>
  );
}
