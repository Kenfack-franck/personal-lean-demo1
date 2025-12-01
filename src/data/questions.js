export const QUESTIONS = {
  // --- FRANÇAIS 🇫🇷 ---
  "Français": {
    "junior": [ // 4 Questions (Primaire/Collège)
      {
        id: 1,
        text: "Quand tu fais tes devoirs, as-tu besoin de bouger ?",
        options: [
          { label: "Oui, je ne tiens pas en place", score: 1 },
          { label: "Un petit peu", score: 3 },
          { label: "Non, je suis calme", score: 5 }
        ]
      },
      {
        id: 2,
        text: "Aimes-tu quand il y a des images dans tes leçons ?",
        options: [
          { label: "J'adore ça !", score: 1 },
          { label: "Ça m'aide un peu", score: 3 },
          { label: "Je préfère lire du texte", score: 5 }
        ]
      },
      {
        id: 3,
        text: "Il y a-t-il du bruit autour de toi quand tu apprends ?",
        options: [
          { label: "Oui (télé, frères et sœurs...)", score: 1 },
          { label: "Un peu de bruit", score: 3 },
          { label: "C'est le silence complet", score: 5 }
        ]
      },
      {
        id: 4,
        text: "T'ennuies-tu vite quand tu lis ?",
        options: [
          { label: "Oui, très vite", score: 1 },
          { label: "Ça dépend du sujet", score: 3 },
          { label: "Non, j'aime lire", score: 5 }
        ]
      }
    ],
    "high_school": [ // 5 Questions (Lycée)
      {
        id: 1,
        text: "Où est ton téléphone quand tu révises ?",
        options: [
          { label: "Dans ma main / Sur le bureau", score: 1 },
          { label: "Dans ma poche", score: 3 },
          { label: "Dans une autre pièce / Éteint", score: 5 }
        ]
      },
      {
        id: 2,
        text: "À quelle fréquence regardes-tu les notifications ?",
        options: [
          { label: "Toutes les 5 minutes", score: 1 },
          { label: "Une fois par heure", score: 3 },
          { label: "Jamais quand je travaille", score: 5 }
        ]
      },
      {
        id: 3,
        text: "Ta méthode de travail principale ?",
        options: [
          { label: "Relire le cours simplement", score: 1 },
          { label: "Surligner les mots", score: 3 },
          { label: "Faire des fiches / Me tester", score: 5 }
        ]
      },
      {
        id: 4,
        text: "Ton niveau de fatigue actuel ?",
        options: [
          { label: "Épuisé(e)", score: 1 },
          { label: "Moyen", score: 3 },
          { label: "En forme", score: 5 }
        ]
      },
      {
        id: 5,
        text: "Préfères-tu les textes courts ou longs ?",
        options: [
          { label: "Courts et rapides (Bullet points)", score: 1 },
          { label: "Moyens", score: 3 },
          { label: "Longs et détaillés", score: 5 }
        ]
      }
    ],
    "higher_ed": [ // 7 Questions (Supérieur/Pro)
      {
        id: 1,
        text: "Durée maximale de concentration intense (Deep Work) ?",
        options: [
          { label: "Moins de 20 min", score: 1 },
          { label: "45 min environ", score: 3 },
          { label: "Plus d'1h30", score: 5 }
        ]
      },
      {
        id: 2,
        text: "Ton organisation avant un examen/projet ?",
        options: [
          { label: "Dernière minute (Urgence)", score: 1 },
          { label: "Quelques notes", score: 3 },
          { label: "Planning précis à l'avance", score: 5 }
        ]
      },
      {
        id: 3,
        text: "Charge mentale actuelle (stress perso/pro) ?",
        options: [
          { label: "Saturé(e)", score: 1 },
          { label: "Gérable", score: 3 },
          { label: "Focus total sur l'étude", score: 5 }
        ]
      },
      {
        id: 4,
        text: "Multitasking (Podcast/Musique en travaillant) ?",
        options: [
          { label: "Toujours", score: 1 },
          { label: "Parfois", score: 3 },
          { label: "Jamais", score: 5 }
        ]
      },
      {
        id: 5,
        text: "Gestion des pauses ?",
        options: [
          { label: "Réseaux sociaux (Scrolling)", score: 1 },
          { label: "Rien de spécial", score: 3 },
          { label: "Marche / Étirements / Déconnexion", score: 5 }
        ]
      },
      {
        id: 6,
        text: "Motivation pour ce sujet ?",
        options: [
          { label: "Obligation pure", score: 1 },
          { label: "Nécessaire", score: 3 },
          { label: "Passion / Curiosité", score: 5 }
        ]
      },
      {
        id: 7,
        text: "Support préféré ?",
        options: [
          { label: "Écran uniquement", score: 2 },
          { label: "Mixte", score: 3 },
          { label: "Papier / Livre", score: 5 }
        ]
      }
    ]
  },

  // --- ENGLISH 🇬🇧 ---
  "Anglais": {
    "junior": [
      { id: 1, text: "Do you need to move when doing homework?", options: [{label: "Yes, I can't sit still", score: 1}, {label: "A little bit", score: 3}, {label: "No, I'm calm", score: 5}] },
      { id: 2, text: "Do you like pictures in your lessons?", options: [{label: "I love it!", score: 1}, {label: "It helps a bit", score: 3}, {label: "I prefer text", score: 5}] },
      { id: 3, text: "Is it noisy where you study?", options: [{label: "Yes (TV, siblings...)", score: 1}, {label: "A little noise", score: 3}, {label: "Total silence", score: 5}] },
      { id: 4, text: "Do you get bored quickly when reading?", options: [{label: "Yes, very fast", score: 1}, {label: "Depends on the topic", score: 3}, {label: "No, I like reading", score: 5}] }
    ],
    "high_school": [
      { id: 1, text: "Where is your phone when studying?", options: [{label: "In my hand / On desk", score: 1}, {label: "In my pocket", score: 3}, {label: "Another room / Off", score: 5}] },
      { id: 2, text: "How often do you check notifications?", options: [{label: "Every 5 mins", score: 1}, {label: "Hourly", score: 3}, {label: "Never when working", score: 5}] },
      { id: 3, text: "Your main study method?", options: [{label: "Just reading", score: 1}, {label: "Highlighting", score: 3}, {label: "Flashcards / Quizzing", score: 5}] },
      { id: 4, text: "Current energy level?", options: [{label: "Exhausted", score: 1}, {label: "Okay", score: 3}, {label: "Energetic", score: 5}] },
      { id: 5, text: "Preferred text length?", options: [{label: "Short (Bullet points)", score: 1}, {label: "Medium", score: 3}, {label: "Long & Detailed", score: 5}] }
    ],
    "higher_ed": [
      { id: 1, text: "Max deep focus duration?", options: [{label: "< 20 mins", score: 1}, {label: "~ 45 mins", score: 3}, {label: "> 1h30", score: 5}] },
      { id: 2, text: "Planning habits?", options: [{label: "Last minute", score: 1}, {label: "Some notes", score: 3}, {label: "Detailed plan", score: 5}] },
      { id: 3, text: "Current mental load (stress)?", options: [{label: "Overwhelmed", score: 1}, {label: "Manageable", score: 3}, {label: "Fully focused", score: 5}] },
      { id: 4, text: "Multitasking?", options: [{label: "Always", score: 1}, {label: "Sometimes", score: 3}, {label: "Never", score: 5}] },
      { id: 5, text: "Break habits?", options: [{label: "Social media", score: 1}, {label: "Nothing", score: 3}, {label: "Walking / Stretching", score: 5}] },
      { id: 6, text: "Motivation?", options: [{label: "Forced", score: 1}, {label: "Necessary", score: 3}, {label: "Passion", score: 5}] },
      { id: 7, text: "Preferred medium?", options: [{label: "Screen only", score: 2}, {label: "Mixed", score: 3}, {label: "Paper / Books", score: 5}] }
    ]
  },

  // --- GERMAN 🇩🇪 ---
  "Allemand": {
    "junior": [
      { id: 1, text: "Musst du dich bei den Hausaufgaben bewegen?", options: [{label: "Ja, ständig", score: 1}, {label: "Ein bisschen", score: 3}, {label: "Nein, ich bin ruhig", score: 5}] },
      { id: 2, text: "Magst du Bilder im Unterricht?", options: [{label: "Ich liebe es!", score: 1}, {label: "Es hilft etwas", score: 3}, {label: "Ich bevorzuge Text", score: 5}] },
      { id: 3, text: "Ist es laut, wo du lernst?", options: [{label: "Ja (TV, Geschwister...)", score: 1}, {label: "Etwas Lärm", score: 3}, {label: "Totale Stille", score: 5}] },
      { id: 4, text: "Langweilst du dich schnell beim Lesen?", options: [{label: "Ja, sehr schnell", score: 1}, {label: "Hängt vom Thema ab", score: 3}, {label: "Nein, ich lese gern", score: 5}] }
    ],
    "high_school": [
      { id: 1, text: "Wo ist dein Handy beim Lernen?", options: [{label: "In der Hand / Auf dem Tisch", score: 1}, {label: "In der Tasche", score: 3}, {label: "Anderer Raum / Aus", score: 5}] },
      { id: 2, text: "Wie oft checkst du Nachrichten?", options: [{label: "Alle 5 Min", score: 1}, {label: "Stündlich", score: 3}, {label: "Nie beim Arbeiten", score: 5}] },
      { id: 3, text: "Deine Lernmethode?", options: [{label: "Nur lesen", score: 1}, {label: "Markieren", score: 3}, {label: "Karteikarten / Tests", score: 5}] },
      { id: 4, text: "Aktuelles Energielevel?", options: [{label: "Erschöpft", score: 1}, {label: "Okay", score: 3}, {label: "Fit", score: 5}] },
      { id: 5, text: "Bevorzugte Textlänge?", options: [{label: "Kurz (Stichpunkte)", score: 1}, {label: "Mittel", score: 3}, {label: "Lang & Detailliert", score: 5}] }
    ],
    "higher_ed": [
      { id: 1, text: "Maximale Konzentrationsdauer?", options: [{label: "< 20 Min", score: 1}, {label: "~ 45 Min", score: 3}, {label: "> 1h30", score: 5}] },
      { id: 2, text: "Planungsgewohnheiten?", options: [{label: "Letzte Minute", score: 1}, {label: "Ein paar Notizen", score: 3}, {label: "Detaillierter Plan", score: 5}] },
      { id: 3, text: "Mentale Belastung (Stress)?", options: [{label: "Überfordert", score: 1}, {label: "Machbar", score: 3}, {label: "Voll fokussiert", score: 5}] },
      { id: 4, text: "Multitasking?", options: [{label: "Immer", score: 1}, {label: "Manchmal", score: 3}, {label: "Nie", score: 5}] },
      { id: 5, text: "Pausengewohnheiten?", options: [{label: "Social Media", score: 1}, {label: "Nichts", score: 3}, {label: "Gehen / Dehnen", score: 5}] },
      { id: 6, text: "Motivation?", options: [{label: "Zwang", score: 1}, {label: "Notwendig", score: 3}, {label: "Leidenschaft", score: 5}] },
      { id: 7, text: "Bevorzugtes Medium?", options: [{label: "Nur Bildschirm", score: 2}, {label: "Gemischt", score: 3}, {label: "Papier / Buch", score: 5}] }
    ]
  }
};