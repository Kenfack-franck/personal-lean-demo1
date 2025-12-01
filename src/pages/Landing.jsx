import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { ArrowRight, Brain, Zap, Clock, BookOpen } from 'lucide-react';

export default function Landing() {
  return (
    <Layout isLanding={true}>
      {/* HERO SECTION */}
      <div className="relative overflow-hidden bg-white pb-16 pt-16 lg:pb-32 lg:pt-24">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-bold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Nouvelle technologie v1.0
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            L'apprentissage qui <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">s'adapte à ton cerveau.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
            PersonalLean transforme n'importe quel PDF en un cours interactif calibré sur ton profil cognitif. Fini le décrochage scolaire.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <Link 
              to="/setup" 
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
            >
              Commencer l'expérience <ArrowRight size={20}/>
            </Link>
            
          </div>
        </div>

        {/* Décoration de fond */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/10 blur-[100px] rounded-full -z-0 pointer-events-none"></div>
      </div>

      {/* FEATURES SECTION */}
      <div id="features" className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Brain className="text-indigo-600" size={32}/>}
              title="Profilage Cognitif"
              desc="Notre algorithme analyse ton niveau d'attention et adapte la longueur des leçons."
            />
            <FeatureCard 
              icon={<BookOpen className="text-pink-600" size={32}/>}
              title="Reformulation IA"
              desc="Les cours sont réécrits par une IA experte pour être clairs, concis et sans blabla."
            />
            <FeatureCard 
              icon={<Clock className="text-amber-600" size={32}/>}
              title="Rythme Adapté"
              desc="Un minuteur Pomodoro intégré qui se cale sur tes capacités de concentration réelles."
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="font-bold text-xl text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}