import OpenAI from 'openai';

// 👇 COLLE TES 3 OU 4 CLÉS ICI (Entre guillemets, séparées par des virgules)
const API_KEYS = [
  "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",
  "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",
  "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",
];

const queryGroq = async (messages) => {
  const apiKey = API_KEYS[Math.floor(Math.random() * API_KEYS.length)];
  
  const client = new OpenAI({
    apiKey: apiKey,
    baseURL: "https://api.groq.com/openai/v1",
    dangerouslyAllowBrowser: true
  });

  const response = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: messages,
    temperature: 0.3,
    response_format: { type: "json_object" }
  });

  return JSON.parse(response.choices[0].message.content);
};

// 1. GÉNÉRER LA STRUCTURE (Plan du cours)
export const generateStructure = async (pdfText, level, language, timerMinutes) => {
  const safeText = pdfText.length > 8000 ? pdfText.substring(0, 8000) : pdfText;

  // Calcul dynamique des unités max
  let maxUnits = 5;
  if (timerMinutes <= 15) maxUnits = 3;
  else if (timerMinutes >= 45) maxUnits = 8;

  const systemPrompt = `
    ROLE: Architecte pédagogique senior.
    TACHE: Analyse ce document et structure un cours synthétique.
    CIBLE: Niveau ${level}.
    
    RÈGLE DE LANGUE ABSOLUE (CRITIQUE) :
    Ta réponse JSON doit être ENTIÈREMENT rédigée en : ${language.toUpperCase()}.
    Si le texte source est dans une autre langue, tu DOIS LE TRADUIRE.
    
    CONTRAINTES :
    1. Génère ENTRE 3 ET ${maxUnits} unités maximum.
    2. Regroupe les chapitres pour rester synthétique.
    
    JSON STRICT (En ${language}) :
    {
      "title": "Titre du Cours (Traduit en ${language})",
      "summary": "Résumé global (En ${language})",
      "units": [
        { 
          "title": "Nom du concept (En ${language})", 
          "description": "Résumé très précis (En ${language})" 
        }
      ]
    }
  `;

  return await queryGroq([
    { role: "system", content: systemPrompt },
    { role: "user", content: safeText }
  ]);
};

// 2. GÉNÉRER LE CONTENU DÉTAILLÉ (Leçon)
export const generateUnitContent = async (unitTitle, unitDescription, level, language) => {
  
  const systemPrompt = `
    ROLE: Expert technique et pédagogique multilingue.
    TACHE: Rédige une leçon sur : "${unitTitle}".
    CONTEXTE : "${unitDescription}".
    CIBLE: Niveau ${level}.
    
    RÈGLE DE LANGUE ABSOLUE (CRITIQUE) :
    TOUT le contenu (explications, exemples, titres) DOIT être en : ${language.toUpperCase()}.
    C'est impératif. Si tu écris un seul mot dans une autre langue, c'est une erreur.
    
    RÈGLES DE RÉDACTION :
    1. PAS de "Bonjour", PAS de "Conclusion".
    2. Rentre DIRECTEMENT dans le sujet (Définition -> Fonctionnement).
    3. Utilise du gras (Markdown **) pour les mots clés.

    JSON STRICT (Rédigé en ${language}) :
    {
      "content": "Le cours (400 mots max, en ${language}).",
      "key_point": "La phrase clé à retenir (en ${language}).",
      "example": "Un exemple concret (en ${language}).",
      "action": "Un exercice mental (en ${language})."
    }
  `;

  return await queryGroq([
    { role: "system", content: systemPrompt },
    { role: "user", content: `Génère le cours maintenant en ${language}.` }
  ]);
};