'use client';

import React from 'react';
import { FlashScoreMatchTracker } from '@/app/components/FlashScoreMatchTracker';
import { Breadcrumbs } from '@/app/components/Breadcrumbs';

export default function MatchesPage() {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <Breadcrumbs 
          items={[
            { label: "Matches" }
          ]}
        />
      </div>
      <FlashScoreMatchTracker />
    </div>
  );
}