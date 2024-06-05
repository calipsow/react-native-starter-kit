export default function shuffleArray(array = []) {
  if (!Array.isArray(array) || !array.length) return [];
  // Kopiere das übergebene Array, um die Originaldaten unverändert zu lassen
  let shuffledArray = array.slice();

  // Gehe das Array von hinten durch
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // Wähle ein zufälliges Element aus den noch nicht durchlaufenen Elementen
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Tausche das aktuelle Element mit dem zufällig gewählten Element
    [shuffledArray[i], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[i],
    ];
  }

  // Gebe das gemischte Array zurück
  return shuffledArray;
}
