"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamically import heavy components
const FeatureShowcase = dynamic(() => import("./FeatureShowcase"), {
  ssr: false,
  loading: () => <div className="loading-skeleton">Loading features...</div>,
});

const SmartNewsFeed = dynamic(() => import("./SmartNewsFeed"), {
  ssr: false,
  loading: () => <div className="loading-skeleton">Loading news...</div>,
});

export default function DIYF() {
  return (
    <div className="diyf-container">
      <FeatureShowcase />
      <SmartNewsFeed />
    </div>
  );
}