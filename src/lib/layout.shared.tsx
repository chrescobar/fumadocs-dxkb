import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-2">
          <Image
            src="/dxkb-logo.svg"
            alt="DXKB Logo"
            width={32}
            height={32}
            className="h-8 w-auto"
          />
          <span>DXKB Docs</span>
        </div>
      ),
    },
  };
}
