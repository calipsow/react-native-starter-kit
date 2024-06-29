const sortObjectArrayByDate = ({ property = '', dataset = [] }) => {
  const today = new Date().getTime(); // Current date for the comparison basis

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

  // Sort future events in ascending order by date
  futureEvents.sort((a, b) => {
    const timeA = new Date(a[property]['seconds'] * 1000);
    const timeB = new Date(b[property]['seconds'] * 1000);
    return timeA - timeB;
  });

// Sort past events in descending order by date
  pastEvents.sort((a, b) => {
    const timeA = new Date(a[property]['seconds'] * 1000);
    const timeB = new Date(b[property]['seconds'] * 1000);
    return timeB - timeA;
  });

  return { futureEvents, pastEvents, nullEvents };
};


export default sortObjectArrayByDate;
