
import type React from 'react';

export type Section = 'architecture' | 'schema' | 'advantages';

export interface Student {
  id: number;
  name: string;
  major: string;
}

export interface Advantage {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}
