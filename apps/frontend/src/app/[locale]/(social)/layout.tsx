import React from 'react';

export default function SocialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="social-app">
      <div className="bg-gradient-to-br from-blue-900/20 via-slate-900/20 to-blue-900/20 min-h-screen">
        {children}
      </div>
    </div>
  );
}
