import { useState } from 'react';
import { useApp } from '../context/Store';
import { generateUnitContent } from '../services/groq';
import Layout from '../components/Layout';
import { 
  BookOpen, ChevronRight, Lightbulb, 
  BrainCircuit, Star, ArrowRight, Loader2 
} from 'lucide-react';

export default function StudyRoom() {
  const { courseData, setCourseData, userProfile } = useApp();
  
  // On sélectionne l'unité active (0 = la première par défaut)
  const [activeUnitIdx, setActiveUnitIdx] = useState(0);
  const [loading, setLoading] = useState(false);

  if (!courseData) return <Layout><div className="p-10 text-center">Aucun cours chargé.</div></Layout>;

  // Fonction pour charger le contenu si pas encore présent
  const selectUnit = async (idx) => {
    setActiveUnitIdx(idx);
    const unit = courseData.units[idx];

    // Si le contenu n'existe pas encore, on appelle l'IA
    if (!unit.content && !loading) {
      setLoading(true);
      try {
        const content = await generateUnitContent(
            unit.title, 
            unit.description, 
            userProfile.level, 
            userProfile.language
        );
        
        // Mise à jour du cours avec le nouveau contenu
        const newUnits = [...courseData.units];
        newUnits[idx] = { ...unit, ...content };
        setCourseData({ ...courseData, units: newUnits });

      } catch (err) {
        alert("Petite erreur de réseau. Réessaie !");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Données de l'unité active
  const currentUnit = courseData.units[activeUnitIdx];
  const isContentReady = currentUnit.content;

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row gap-8 min-h-[80vh]">
        
        {/* SIDEBAR : SOMMAIRE (Navigation à gauche) */}
        <div className="lg:w-1/3 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24 shadow-sm">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
              Sommaire du cours
            </h2>
            <div className="space-y-2">
              {courseData.units.map((unit, idx) => (
                <button
                  key={idx}
                  onClick={() => selectUnit(idx)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-center justify-between group ${
                    activeUnitIdx === idx 
                      ? 'bg-indigo-600 text-white shadow-md transform scale-[1.02]' 
                      : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <div>
                    <span className={`text-xs font-bold uppercase ${activeUnitIdx === idx ? 'text-indigo-200' : 'text-slate-400'}`}>
                      Chapitre {idx + 1}
                    </span>
                    <h3 className="font-bold leading-tight mt-1">{unit.title}</h3>
                  </div>
                  {activeUnitIdx === idx && <ChevronRight size={20}/>}
                </button>
              ))}
            </div>
            
            {/* Bouton Print (Pour le prof) */}
            <div className="mt-8 pt-6 border-t border-slate-100">
               <button onClick={() => window.print()} className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 font-medium">
                 🖨️ Imprimer le support
               </button>
            </div>
          </div>
        </div>

        {/* MAIN : CONTENU DU COURS (Lecture à droite) */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden min-h-[600px] relative">
            
            {/* Header du contenu */}
            <div className="bg-indigo-50 p-8 border-b border-indigo-100">
              <div className="flex items-center gap-2 text-indigo-500 font-bold text-sm mb-3">
                <BookOpen size={18}/> 
                <span>MODULE {activeUnitIdx + 1}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-950 mb-4">
                {currentUnit.title}
              </h1>
              <p className="text-indigo-800/70 text-lg leading-relaxed">
                {currentUnit.description}
              </p>
            </div>

            {/* Corps du contenu */}
            <div className="p-8 md:p-12">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                  <Loader2 className="w-12 h-12 text-indigo-600 animate-spin"/>
                  <p className="text-slate-500 animate-pulse text-lg">L'IA rédige ton cours personnalisé...</p>
                </div>
              ) : isContentReady ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  
                  {/* Le Texte Principal (Avec rendu du GRAS propre) */}
                  <div className="prose prose-lg prose-indigo max-w-none text-slate-700 leading-8 whitespace-pre-line">
                    {renderTextWithBold(currentUnit.content)}
                  </div>

                  {/* Section Exemple (Style Carte Jaune) */}
                  {currentUnit.example && (
                    <div className="mt-12 bg-amber-50 rounded-2xl p-8 border border-amber-100 relative overflow-hidden">
                      <div className="absolute -right-6 -top-6 text-amber-100/50">
                        <Lightbulb size={120} />
                      </div>
                      <div className="relative z-10">
                        <h3 className="flex items-center gap-2 text-amber-800 font-bold text-xl mb-3">
                          <Lightbulb className="fill-amber-500 text-amber-500"/> Exemple Concret
                        </h3>
                        <p className="text-amber-900/80 text-lg italic">
                          "{renderTextWithBold(currentUnit.example)}"
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Section Action Mentale (Style Carte Bleue) */}
                  {currentUnit.action && (
                    <div className="mt-8 bg-sky-50 rounded-2xl p-8 border border-sky-100">
                      <h3 className="flex items-center gap-2 text-sky-800 font-bold text-xl mb-3">
                        <BrainCircuit className="text-sky-600"/> À toi de jouer
                      </h3>
                      <p className="text-sky-900/80 text-lg">
                        {renderTextWithBold(currentUnit.action)}
                      </p>
                    </div>
                  )}

                  {/* Section "À retenir" (Style Carte Verte) */}
                  {currentUnit.key_point && (
                    <div className="mt-8 bg-emerald-50 rounded-2xl p-6 border border-emerald-100 flex items-start gap-4">
                      <div className="bg-emerald-100 p-2 rounded-full text-emerald-600 mt-1">
                        <Star size={24} className="fill-emerald-600"/>
                      </div>
                      <div>
                         <h4 className="text-emerald-800 font-bold uppercase text-xs tracking-wider mb-1">Point Clé</h4>
                         <p className="text-emerald-900 font-bold text-lg">
                           {renderTextWithBold(currentUnit.key_point)}
                         </p>
                      </div>
                    </div>
                  )}

                  {/* Navigation Suivant */}
                  {activeUnitIdx < courseData.units.length - 1 && (
                    <div className="mt-12 pt-8 border-t border-slate-100 flex justify-end">
                      <button 
                        onClick={() => selectUnit(activeUnitIdx + 1)}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-full font-bold hover:bg-indigo-700 transition shadow-lg hover:shadow-indigo-200"
                      >
                        Module Suivant <ArrowRight/>
                      </button>
                    </div>
                  )}

                </div>
              ) : (
                <div className="text-center py-20">
                  <button 
                    onClick={() => selectUnit(activeUnitIdx)}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition"
                  >
                    Générer ce chapitre ✨
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Fonction utilitaire pour transformer le Markdown (**gras**) en HTML propre
const renderTextWithBold = (text) => {
  if (!text) return null;
  
  // On découpe le texte à chaque fois qu'on trouve **mot**
  const parts = text.split(/(\*\*.*?\*\*)/g);
  
  return parts.map((part, index) => {
    // Si la partie commence et finit par **, c'est du gras
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <span key={index} className="font-extrabold text-indigo-900">
          {part.slice(2, -2)} {/* On enlève les étoiles ici */}
        </span>
      );
    }
    // Sinon, c'est du texte normal
    return part;
  });
};