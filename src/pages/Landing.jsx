import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { ArrowRight, Brain, Globe, FileText, Check, Zap, Layers } from 'lucide-react';

export default function Landing() {
  return (
    <Layout isLanding={true}>
      
      {/* --- 1. HERO SECTION (L'Accroche) --- */}
      <section className="relative pt-16 pb-24 lg:pt-32 lg:pb-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Colonne Gauche : Texte */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Innovation Éducative v1.0
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-1000">
              Transforme tes cours en <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Super-Pouvoirs.</span>
            </h1>

            <p className="text-lg text-slate-500 mb-8 max-w-xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
              Ton attention est unique. Ton cours doit l'être aussi. 
              <span className="font-bold text-slate-900"> PersonnalLearn</span> la réactive. 
              Arrête de lutter avec des formats inadaptés. Laisse l'IA calibrer le savoir sur ton rythme cognitif.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              <Link 
                to="/setup" 
                className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-700 transition shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 transform hover:scale-105"
              >
                Lancer le diagnostic <ArrowRight size={20}/>
              </Link>
              <a href="#how-it-works" className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-bold text-lg hover:bg-slate-50 transition flex items-center justify-center">
                Comment ça marche ?
              </a>
            </div>
          </div>

          {/* Colonne Droite : Image IA */}
          <div className="relative lg:h-[600px] flex items-center justify-center animate-in fade-in slide-in-from-right-8 duration-1000">
            <div className="relative w-full max-w-lg aspect-square">
              {/* Cercles décoratifs derrière */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-8 -left-8 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              
              {/* L'Image Principale */}
              <img 
                src="/AI_image.jpg" 
                alt="AI Learning" 
                className="relative rounded-3xl shadow-2xl border-4 border-white object-cover w-full h-full transform rotate-3 hover:rotate-0 transition duration-500"
              />

              {/* Carte Flottante "Statistique" */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 animate-bounce-slow">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <Zap size={24} fill="currentColor"/>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase">Efficacité</p>
                  <p className="text-xl font-bold text-slate-900">Max concentration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. BANDEAU DE CONFIANCE --- */}
      <div className="border-y border-slate-100 bg-slate-50/50 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Technologie propulsée par</p>
          <div className="flex flex-wrap justify-center gap-12 grayscale opacity-60">
            <span className="text-xl font-black text-slate-800 flex items-center gap-2"><Brain size={24}/> Cognitive Science</span>
            <span className="text-xl font-black text-slate-800 flex items-center gap-2"><Layers size={24}/> Llama 3.1 & Gemini</span>
            <span className="text-xl font-black text-slate-800 flex items-center gap-2"><Globe size={24}/> Polyglot Engine</span>
          </div>
        </div>
      </div>

      {/* --- 3. FEATURES (Pourquoi nous ?) --- */}
      <section className="py-24 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">À chaque cerveau son rythme, à chaque élève sa méthode.</h2>
            <p className="text-lg text-slate-500">
              Arrête de lutter avec des PDF interminables. Laisse l'IA adapter le savoir à ta façon de penser.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Brain className="text-white" size={32}/>}
              color="bg-indigo-600"
              title="Profilage Cognitif"
              desc="Réponds à 5 questions et notre algorithme détermine si tu es un apprenant Visuel, Auditif, Court ou Long terme."
            />
            <FeatureCard 
              icon={<FileText className="text-white" size={32}/>}
              color="bg-pink-600"
              title="Reformulation IA"
              desc="L'IA réécrit tes cours. Finis les jargons compliqués. Place aux explications claires, aux exemples concrets et aux analogies."
            />
            <FeatureCard 
              icon={<Globe className="text-white" size={32}/>}
              color="bg-amber-600"
              title="Inclusion Totale"
              desc="Traduction instantanée en 3 langues et mode 'Professeur' pour imprimer les fiches dans les zones sans internet."
            />
          </div>
        </div>
      </section>

      {/* --- 4. HOW IT WORKS (Comment ça marche) --- */}
      <section id="how-it-works" className="py-24 bg-slate-900 text-white overflow-hidden relative">
        {/* Cercles de fond */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
             <div className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] rounded-full bg-indigo-600 blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                Comment ça marche ? <br/>
                <span className="text-indigo-400">Simple comme bonjour.</span>
              </h2>
              <div className="space-y-8 mt-10">
                <Step 
                  number="01" 
                  title="Le Diagnostic" 
                  desc="Tu réponds au questionnaire rapide pour calibrer l'IA sur ton cerveau." 
                />
                <Step 
                  number="02" 
                  title="L'Importation" 
                  desc="Tu envoies ton cours (PDF) ou tu utilises notre bibliothèque de démo." 
                />
                <Step 
                  number="03" 
                  title="L'Apprentissage" 
                  desc="L'IA génère un parcours sur-mesure. Tu lis, tu comprends, tu valides." 
                />
              </div>
            </div>
            
            <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl transform rotate-3 hover:rotate-0 transition duration-500">
               {/* Simulation d'interface */}
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-3 h-3 rounded-full bg-red-500"></div>
                 <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500"></div>
               </div>
               <div className="space-y-4">
                 <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                 <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                 <div className="h-32 bg-indigo-900/50 rounded-xl border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-mono text-sm p-4">
                   {`> Generating course for "Visual Learner"...`} <br/>
                   {`> Optimizing for 15min attention span...`} <br/>
                   {`> Translating to French...`} <br/>
                   {`> Done! 🚀`}
                 </div>
                 <div className="grid grid-cols-2 gap-4 mt-4">
                   <div className="h-20 bg-slate-700 rounded-xl"></div>
                   <div className="h-20 bg-slate-700 rounded-xl"></div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 5. CTA FINAL --- */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-6">Prêt à hacker ton apprentissage ?</h2>
          <p className="text-xl text-slate-500 mb-10">
            Rejoins la révolution éducative. C'est gratuit, c'est puissant, c'est pour toi.
          </p>
          <Link 
            to="/setup" 
            className="inline-flex items-center gap-2 px-10 py-5 bg-indigo-600 text-white rounded-full font-bold text-xl hover:bg-indigo-700 transition shadow-xl shadow-indigo-200 transform hover:scale-105"
          >
            Commencer maintenant <ArrowRight/>
          </Link>
        </div>
      </section>

    </Layout>
  );
}

// --- SOUS-COMPOSANTS ---

function FeatureCard({ icon, color, title, desc }) {
  return (
    <div className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="font-bold text-2xl text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed text-lg">{desc}</p>
    </div>
  );
}

function Step({ number, title, desc }) {
  return (
    <div className="flex gap-6">
      <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-indigo-500 text-indigo-400 flex items-center justify-center font-bold text-xl">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}