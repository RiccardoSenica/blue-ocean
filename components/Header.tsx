import React from 'react';
import { ThemeToggle } from '@components/ThemeToggle';
import { WavesIcon } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 h-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="swell">
          <div className="wave"></div>
          <div className="wave wave-2"></div>
          <div className="wave wave-3"></div>
        </div>
      </div>

      <div className="relative px-4 h-full">
        <div className="absolute right-4 top-3">
          <ThemeToggle />
        </div>
        <div className="container max-w-4xl mx-auto h-full flex flex-col items-center justify-center text-white">
          <div className="flex items-center gap-2">
            <WavesIcon className="h-6 w-6" />
            <h1 className="text-2xl font-bold tracking-tight">
              Blue Ocean Strategy
            </h1>
          </div>
          <p className="text-cyan-100 text-sm">
            Navigate to new market spaces and create uncontested growth
          </p>
        </div>
      </div>
    </header>
  );
}
