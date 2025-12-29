import { ReactNode, useState } from 'react';
import { Menu, X } from 'lucide-react';

interface AppLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export function AppLayout({ sidebar, children }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-parchment-100 flex">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-parchment-50 rounded-lg shadow-parchment border border-parchment-200 text-ink-700 hover:bg-parchment-100 transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-ink-900/20 z-40 animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50
          w-72 flex-shrink-0 bg-parchment-50 border-r border-parchment-200
          flex flex-col h-screen
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Mobile close button */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 text-ink-600 hover:text-ink-800 hover:bg-parchment-100 rounded-lg transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>

        <div onClick={() => setIsSidebarOpen(false)}>{sidebar}</div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-h-screen overflow-auto lg:ml-0">
        <div className="lg:hidden h-16" /> {/* Spacer for mobile menu button */}
        {children}
      </main>
    </div>
  );
}
