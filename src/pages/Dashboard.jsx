import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/Store';
import { extractTextFromPdf } from '../services/pdf';
import { generateStructure } from '../services/groq'; // Note le changement d'import
import Layout from '../components/Layout';
import { Upload, FileText, Loader2 } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const { userProfile, setCourseData, setLoading, loading, getTimerDuration, setPdfContent } = useApp();
  const [error, setError] = useState('');

  const handleProcess = async (source) => {
    try {
      setLoading(true);
      setError('');
      
      const text = await extractTextFromPdf(source);
      setPdfContent(text); // SAUVEGARDE LE TEXTE
      
      // Génère seulement la structure (rapide)
      const courseStructure = await generateStructure(
        text, 
        userProfile.level, 
        userProfile.language,
        Math.floor(getTimerDuration() / 60)
      );
      
      setCourseData(courseStructure);
      navigate('/study');
      
    } catch (err) {
      console.error(err);
      setError("Erreur : " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    if (e.target.files?.[0]) handleProcess(e.target.files[0]);
  };

  const handleDemo = () => handleProcess('/demo.pdf');

  return (
    <Layout>
      <div className="max-w-2xl mx-auto text-center mt-10">
        <h2 className="text-2xl font-bold mb-6">Que veux-tu étudier aujourd'hui ?</h2>
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-dashed border-indigo-200">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
            <p className="text-slate-600 animate-pulse">Création du plan de cours...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <label className="cursor-pointer group flex flex-col items-center p-8 bg-white rounded-2xl border-2 border-dashed border-slate-300 hover:border-indigo-500 hover:bg-indigo-50 transition">
              <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-100"><Upload size={32} /></div>
              <h3 className="font-bold text-slate-700">Importer un PDF</h3>
            </label>
            <button onClick={handleDemo} className="flex flex-col items-center p-8 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm"><FileText size={32} /></div>
              <h3 className="font-bold text-lg">Mode Démo</h3>
            </button>
          </div>
        )}
        {error && <p className="mt-6 text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>}
      </div>
    </Layout>
  );
}