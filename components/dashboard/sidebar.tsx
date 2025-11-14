'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FileText,
  BookOpen,
  Zap,
  MessageSquare,
  Settings,
  BarChart3,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Tài Liệu', icon: FileText },
  { href: '/dashboard/flashcards', label: 'Flashcards', icon: BookOpen },
  { href: '/dashboard/quiz', label: 'Quiz', icon: Zap },
  { href: '/dashboard/search', label: 'Tìm Kiếm', icon: MessageSquare },
  { href: '/dashboard/summary', label: 'Tóm Tắt', icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo Area - Hidden in header, but keeps spacing */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">Menu</h3>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Settings at Bottom */}
      <div className="p-4 border-t border-gray-200">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition"
        >
          <Settings className="w-5 h-5" />
          <span>Cài Đặt</span>
        </Link>
      </div>
    </aside>
  );
}
