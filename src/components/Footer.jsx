import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Colonne 1 : Brand */}
        <div>
          <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span> PersonnalLearn
          </h3>
          <p className="text-sm leading-relaxed opacity-80">
            L'intelligence artificielle au service de la neuro-pédagogie. 
            Apprends mieux, pas plus dur.
          </p>
        </div>

        {/* Colonne 2 : Liens */}
        <div>
          <h4 className="text-white font-bold mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-indigo-400 transition">Accueil</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Comment ça marche</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Tarifs</a></li>
          </ul>
        </div>

        {/* Colonne 3 : Crédits */}
        <div>
          <h4 className="text-white font-bold mb-4">Compétition</h4>
          <p className="text-sm flex items-center gap-1">
            Développé avec <Heart size={14} className="text-red-500 fill-red-500"/> pour le Hackathon.
          </p>
          <p className="text-xs mt-2 opacity-50">© 2024 PersonnalLearn Inc.</p>
        </div>
      </div>
    </footer>
  );
}