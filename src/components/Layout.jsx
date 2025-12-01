import { Link } from 'react-router-dom';
import { BookOpen, User } from 'lucide-react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
            <BookOpen className="w-6 h-6" />
            <span>PersonalLean</span>
          </Link>
          <div className="flex gap-4">
            <Link to="/" className="text-slate-600 hover:text-indigo-600"><User className="w-5 h-5"/></Link>
          </div>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}