import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/Store';
import { QUESTIONS } from '../data/questions';
import Layout from '../components/Layout';
import { ArrowRight, CheckCircle, BrainCircuit } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { userProfile, setUserProfile, calculateProfile } = useApp();
  
  const [step, setStep] = useState('setup');
  
  // Setup temporaire avant validation
  const [tempLang, setTempLang] = useState(userProfile.language);
  const [tempLevel, setTempLevel] = useState("high_school"); // Valeur par défaut technique

  // Gestion du Quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answersScore, setAnswersScore] = useState(0);

  // --- ÉTAPE 1 : CONFIG INITIALE ---
  const handleSetupSubmit = (e) => {
    e.preventDefault();
    
    // On met à jour le profil global
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
    
    // Calcul intelligent (ratio) qui marche peu importe le nombre de questions (4, 5 ou 7)
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

  // --- RENDERERS ---

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
            {/* Les valeurs 'value' doivent correspondre aux clés dans questions.js */}
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
    // On charge les questions selon la sélection
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
    // Traductions simples pour le résultat
    const texts = {
        "Français": { title: "Analyse terminée !", btn: "Accéder à mon espace 🚀" },
        "Anglais": { title: "Analysis Complete!", btn: "Go to Workspace 🚀" },
        "Allemand": { title: "Analyse abgeschlossen!", btn: "Zum Arbeitsbereich 🚀" }
    };
    const t = texts[tempLang] || texts["Français"];

    const profileLabels = {
      short: { title: "Profil Zapping ⚡", desc: "Micro-learning (15 min)." },
      medium: { title: "Profil Standard ⏱️", desc: "Classic Learning (25 min)." },
      long: { title: "Profil Deep Focus 🧘", desc: "Intense Learning (45 min)." }
    };
    const info = profileLabels[userProfile.attentionSpan];

    return (
      <div className="max-w-lg mx-auto mt-10 text-center">
        <div className="bg-white p-10 rounded-3xl border border-indigo-100 shadow-xl shadow-indigo-100/50">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">{t.title}</h2>
          <div className="my-6 p-6 bg-indigo-50 rounded-2xl">
            <h3 className="text-xl font-bold text-indigo-900 mb-2">{info.title}</h3>
            <p className="text-indigo-700">{info.desc}</p>
          </div>
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition"
          >
            {t.btn}
          </button>
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