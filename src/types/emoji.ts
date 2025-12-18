import type React from 'react';

export type Emoji = {
  key: string;
  label: string;
  Comp: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};
