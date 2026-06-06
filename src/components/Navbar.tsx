import Link from 'next/link';
import Image from 'next/image';
import { Home, Info, Settings } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface NavbarProps {
  currentPage: 'home' | 'about' | 'tools' | 'settings';
}

export function Navbar({ currentPage }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="flex items-center gap-2 group">
            <Image 
              src="/logo.ico" 
              alt="AidKit Logo" 
              width={40} 
              height={40} 
              className="rounded-lg shadow-lg group-hover:shadow-xl transition-shadow"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AidKit
            </span>
          </Link>

          <div className="flex items-center gap-1 md:gap-2">
            <Link
              href="/"
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                currentPage === 'home'
                  ? 'bg-primary text-primaryForeground'
                  : 'text-mutedForeground hover:text-foreground hover:bg-accent'
              )}
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">首页</span>
            </Link>

            <Link
              href="/about"
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                currentPage === 'about'
                  ? 'bg-primary text-primaryForeground'
                  : 'text-mutedForeground hover:text-foreground hover:bg-accent'
              )}
            >
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline">关于</span>
            </Link>

            <Link
              href="/settings"
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                currentPage === 'settings'
                  ? 'bg-primary text-primaryForeground'
                  : 'text-mutedForeground hover:text-foreground hover:bg-accent'
              )}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">设置</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}