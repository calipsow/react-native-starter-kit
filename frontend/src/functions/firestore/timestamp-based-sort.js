const sortObjectArrayByDate = ({ property = '', dataset = [] }) => {
  const today = new Date().getTime(); // Aktuelles Datum für die Vergleichsgrundlage

  const futureEvents = [];
  const pastEvents = [];
  const nullEvents = [];

  dataset.forEach(event => {
    if (event[property]) {
      const eventTime = new Date(event[property]['seconds'] * 1000);
      if (eventTime.getTime() >= today) {
        futureEvents.push(event);
      } else {
        pastEvents.push(event);
      }
    } else {
      nullEvents.push(event);
    }
  });

  // Sortiere zukünftige Events in aufsteigender Reihenfolge nach Datum
  futureEvents.sort((a, b) => {
    const timeA = new Date(a[property]['seconds'] * 1000);
    const timeB = new Date(b[property]['seconds'] * 1000);
    return timeA - timeB;
  });

  // Sortiere vergangene Events in absteigender Reihenfolge nach Datum
  pastEvents.sort((a, b) => {
    const timeA = new Date(a[property]['seconds'] * 1000);
    const timeB = new Date(b[property]['seconds'] * 1000);
    return timeB - timeA;
  });

  return { futureEvents, pastEvents, nullEvents };
};

/* Beispiel-Verwendung der Funktion
  const events = [
    { id: 1, start_time: { seconds: new Date('2024-12-25').getTime() / 1000 } }, // Zukünftiges Event
    { id: 2, start_time: null }, // Kein Event-Zeitstempel
    { id: 3, start_time: { seconds: new Date('2020-10-15').getTime() / 1000 } }, // Vergangenes Event
    { id: 4, start_time: { seconds: new Date('2024-11-01').getTime() / 1000 } }, // Zukünftiges Event
    { id: 5, start_time: null }, // Kein Event-Zeitstempel
  ];
  
  const { futureEvents, pastEvents } = sortObjectArrayByDate({
    property: 'start_time',
    dataset: events
  });
  
  console.log("Zukünftige Events:", futureEvents);
  console.log("Vergangene Events:", pastEvents);
  */
export default sortObjectArrayByDate;
