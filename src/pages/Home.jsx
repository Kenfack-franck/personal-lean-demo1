import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/Store';
import { QUESTIONS } from '../data/questions';
import Layout from '../components/Layout';
import { ArrowRight, CheckCircle, BrainCircuit, Zap, Target, Brain, Sparkles } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { userProfile, setUserProfile, calculateProfile } = useApp();
  
  const [step, setStep] = useState('setup');
  
  // Setup temporaire avant validation
  const [tempLang, setTempLang] = useState(userProfile.language);
  const [tempLevel, setTempLevel] = useState("high_school");

  // Gestion du Quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answersScore, setAnswersScore] = useState(0);

  // --- ÉTAPE 1 : CONFIG INITIALE ---
  const handleSetupSubmit = (e) => {
    e.preventDefault();
    
    // On met à jour le profil global avec la langue et le niveau choisis
    setUserProfile(prev => ({
        ...prev,
        language: tempLang,
        level: tempLevel
    }));

    // Reset du quiz
    setCurrentQuestionIndex(0);
    setAnswersScore(0);
    setStep('quiz');
  };

  // --- ÉTAPE 2 : LOGIQUE DU QUIZ ---
  const handleAnswer = (score) => {
    const newScore = answersScore + score;
    setAnswersScore(newScore);

    // Récupération dynamique des questions selon Langue et Niveau
    const questionsList = QUESTIONS[tempLang][tempLevel];
    
    if (currentQuestionIndex < questionsList.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Fin du quiz
      finishQuiz(newScore, questionsList.length * 5);
    }
  };

  const finishQuiz = (finalScore, maxScore) => {
    setStep('analyzing');
    
    // Calcul du profil (short/medium/long)
    const detectedProfile = calculateProfile(finalScore, maxScore);
    
    setTimeout(() => {
      setUserProfile(prev => ({
        ...prev,
        attentionSpan: detectedProfile,
        score: finalScore
      }));
      setStep('result');
    }, 2000);
  };

  // --- RENDERERS (Affichage) ---

  const renderSetup = () => (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-4xl font-bold mb-2 text-indigo-900">PersonalLean</h1>
      <p className="text-slate-500 mb-8">L'assistant pédagogique multilingue qui s'adapte à toi.</p>

      <form onSubmit={handleSetupSubmit} className="space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-xl shadow-indigo-100">
        
        <div>
          <label className="block font-bold text-slate-700 mb-2">Langue / Language / Sprache</label>
          <select 
            className="w-full p-4 border rounded-xl bg-slate-50 text-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setTempLang(e.target.value)}
            value={tempLang}
          >
            <option value="Français">Français 🇫🇷</option>
            <option value="Anglais">English 🇬🇧</option>
            <option value="Allemand">Deutsch 🇩🇪</option>
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-2">Niveau Scolaire</label>
          <select 
            value={tempLevel} 
            onChange={(e) => setTempLevel(e.target.value)}
            className="w-full p-4 border rounded-xl bg-slate-50 text-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="junior">Primaire / Collège (Junior) - 4 Questions</option>
            <option value="high_school">Lycée (High School) - 5 Questions</option>
            <option value="higher_ed">Supérieur / Adulte (Higher Ed) - 7 Questions</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2">
          Commencer <ArrowRight size={20}/>
        </button>
      </form>
    </div>
  );

  const renderQuiz = () => {
    const questionsList = QUESTIONS[tempLang][tempLevel];
    const question = questionsList[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / questionsList.length) * 100;

    return (
      <div className="max-w-xl mx-auto mt-10">
        <div className="w-full bg-slate-200 h-2 rounded-full mb-8">
          <div className="bg-indigo-600 h-2 rounded-full transition-all duration-300" style={{width: `${progress}%`}}></div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
          <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">Question {currentQuestionIndex + 1}/{questionsList.length}</span>
          <h2 className="text-2xl font-bold text-slate-800 mt-2 mb-8">{question.text}</h2>
          
          <div className="space-y-3">
            {question.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt.score)}
                className="w-full text-left p-4 rounded-xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-700 group-hover:text-indigo-900">{opt.label}</span>
                  <ArrowRight size={16} className="text-slate-300 group-hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition"/>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderAnalyzing = () => (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
        <BrainCircuit className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-600" size={32}/>
      </div>
      <h2 className="text-2xl font-bold mt-8 text-slate-800">Analyse du profil...</h2>
      <p className="text-slate-500 mt-2">Configuration de l'IA en {tempLang}...</p>
    </div>
  );

  const renderResult = () => {
    // 1. Définition des Archétypes Cognitifs (Le Nouveau Design)
    const profileConfig = {
      short: {
        title: "Explorateur Agile ⚡",
        color: "amber",
        desc: "Tu as une intelligence vive qui préfère la variété. Ton cerveau traite l'information par 'sprints' rapides.",
        strategy: [
          "Découpage du contenu en micro-concepts",
          "Reformulation directe et visuelle",
          "Pauses stratégiques fréquentes"
        ],
        Icon: Zap
      },
      medium: {
        title: "Stratège Équilibré 🎯",
        color: "indigo",
        desc: "Tu possèdes un rythme d'apprentissage stable. Tu es capable d'alterner théorie et pratique avec fluidité.",
        strategy: [
          "Progression logique et structurée",
          "Mélange équilibré d'exemples et de théorie",
          "Rythme constant et soutenu"
        ],
        Icon: Target
      },
      long: {
        title: "Architecte Profond 🧠",
        color: "emerald",
        desc: "Tu as une capacité de concentration rare (Deep Work). Tu aimes aller au fond des sujets sans interruption.",
        strategy: [
          "Immersion complète dans les sujets",
          "Analyses détaillées et complexes",
          "Sessions de travail intensives"
        ],
        Icon: Brain
      }
    };

    // Configuration actuelle
    const config = profileConfig[userProfile.attentionSpan];
    const Icon = config.Icon;
    
    // Classes de couleurs dynamiques
    const colorClasses = {
      amber: "bg-amber-50 border-amber-200 text-amber-900",
      indigo: "bg-indigo-50 border-indigo-200 text-indigo-900",
      emerald: "bg-emerald-50 border-emerald-200 text-emerald-900"
    };
    const iconColorClasses = {
      amber: "bg-amber-100 text-amber-600",
      indigo: "bg-indigo-100 text-indigo-600",
      emerald: "bg-emerald-100 text-emerald-600"
    };

    // Traductions simples pour les textes fixes
    const texts = {
        "Français": { header: "Diagnostic Terminé", sub: "Ton profil cognitif a été généré.", btn: "Accéder à mon espace 🚀" },
        "Anglais": { header: "Diagnostic Complete", sub: "Your cognitive profile is ready.", btn: "Go to Workspace 🚀" },
        "Allemand": { header: "Diagnose abgeschlossen", sub: "Dein kognitives Profil ist bereit.", btn: "Zum Arbeitsbereich 🚀" }
    };
    const t = texts[tempLang] || texts["Français"];

    return (
      <div className="max-w-2xl mx-auto mt-6 px-4">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          {/* Header Dark Mode */}
          <div className="bg-slate-900 p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-500/20 to-transparent"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
                <Sparkles className="text-yellow-300" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">{t.header}</h2>
              <p className="text-slate-400 text-sm">{t.sub}</p>
            </div>
          </div>

          <div className="p-8 md:p-12">
            
            {/* Carte Profil */}
            <div className={`p-8 rounded-2xl border mb-8 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left ${colorClasses[config.color]}`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${iconColorClasses[config.color]}`}>
                <Icon size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 uppercase tracking-wide opacity-80">Ton Archétype</h3>
                <h4 className="text-3xl font-extrabold mb-3">{config.title}</h4>
                <p className="opacity-90 leading-relaxed text-lg">
                  {config.desc}
                </p>
              </div>
            </div>

            {/* Stratégie */}
            <div className="mb-10">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <BrainCircuit className="text-indigo-600"/> Stratégie d'apprentissage :
              </h4>
              <ul className="space-y-3">
                {config.strategy.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 transform hover:scale-[1.01]"
            >
              {t.btn}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      {step === 'setup' && renderSetup()}
      {step === 'quiz' && renderQuiz()}
      {step === 'analyzing' && renderAnalyzing()}
      {step === 'result' && renderResult()}
    </Layout>
  );
}