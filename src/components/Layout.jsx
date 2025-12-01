import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import Footer from './Footer';

export default function Layout({ children, isLanding = false }) {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col">
      {/* HEADER */}
      <nav className={`sticky top-0 z-50 transition-all ${isLanding ? 'bg-white/80 backdrop-blur-md border-b border-slate-100' : 'bg-white border-b border-slate-200'}`}>
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="w-10 h-10 object-contain transition-transform group-hover:scale-110" 
            />
            <span className="font-extrabold text-xl text-slate-900 tracking-tight">
              Personal<span className="text-indigo-600">Learn</span>
            </span>
          </Link>

          {/* MENU */}
          <div className="flex items-center gap-6">
            {!isLanding && (
               <Link to="/" className="text-sm font-medium text-slate-500 hover:text-indigo-600 hidden sm:block">
                 Accueil
               </Link>
            )}
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-indigo-100 hover:text-indigo-600 transition cursor-pointer">
               <User size={20}/>
            </div>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <main className={`flex-grow ${isLanding ? '' : 'max-w-4xl mx-auto px-4 py-8 w-full'}`}>
        {children}
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}