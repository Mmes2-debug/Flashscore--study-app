'use client';

import React, { useEffect, useState } from 'react';

interface ErrorData {
  message: string;
  stack?: string;
  timestamp: number;
}

export function ErrorMonitor() {
  const [errors, setErrors] = useState<ErrorData[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || process.env.NODE_ENV !== 'development') return;
    const handleError = (event: ErrorEvent) => {
      const errorData: ErrorData = {
        message: event.message,
        stack: event.error?.stack,
        timestamp: Date.now()
      };
      setErrors(prev => [...prev.slice(-4), errorData]);
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      const errorData: ErrorData = {
        message: event.reason?.message || 'Unhandled Promise Rejection',
        stack: event.reason?.stack,
        timestamp: Date.now()
      };
      setErrors(prev => [...prev.slice(-4), errorData]);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  if (!mounted || errors.length === 0 || process.env.NODE_ENV !== 'development') return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      maxWidth: 400,
      zIndex: 9999
    }}>
      {errors.map((error) => (
        <div
          key={error.timestamp}
          style={{
            background: '#ff4444',
            color: 'white',
            padding: '12px',
            marginBottom: '8px',
            borderRadius: '8px',
            fontSize: '12px'
          }}
        >
          <strong>Error:</strong> {error.message}
        </div>
      ))}
    </div>
  );
}