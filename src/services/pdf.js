import * as pdfjsLib from 'pdfjs-dist';

// Configuration du worker (obligatoire pour lire le PDF dans le navigateur)
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export const extractTextFromPdf = async (source) => {
  try {
    let loadingTask;

    // Si source est une chaîne de caractères, c'est une URL (notre démo)
    if (typeof source === 'string') {
      loadingTask = pdfjsLib.getDocument(source);
    } else {
      // Sinon c'est un fichier uploadé (File object)
      const arrayBuffer = await source.arrayBuffer();
      loadingTask = pdfjsLib.getDocument(arrayBuffer);
    }

    const pdf = await loadingTask.promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(' ');
      fullText += pageText + '\n';
    }

    return fullText;
  } catch (error) {
    console.error("Erreur lecture PDF:", error);
    throw new Error("Impossible de lire le PDF.");
  }
};