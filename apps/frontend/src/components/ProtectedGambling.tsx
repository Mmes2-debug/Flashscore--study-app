"use client";

import React from 'react';

interface ProtectedGamblingProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ProtectedGambling({ children }: ProtectedGamblingProps) {
  // Remove all gambling restrictions - show content to all users
  return <>{children}</>;
}

export default ProtectedGambling;