import { createContext, useEffect, useState } from 'react';
// delete file entirely 
export const UnresolvedEventCtx = createContext({
  unresolvedEvents: [],
  setUnresolvedEvents: function () {},
  errorOccurredBy: [],
  isProcessing: false,
});

const ExecuteUnresolvedEventProvider = ({ children }) => {
  const [unresolvedEvents, setUnresolvedEvents] = useState([]);
  const [isProcessing, setProcessing] = useState(false);
  const [errorOccurredBy, setErrorOccurredBy] = useState([]);

  const executeUnresolvedEvent = async (
    unresolvedEvent = async function (...params) {},
  ) => {
    let executionError = undefined;
    try {
      console.log(
        'executing unresolved event nr.',
        unresolvedEvents.indexOf(unresolvedEvent),
      );
      await unresolvedEvent();
      console.log(
        'executing unresolved event nr.',
        unresolvedEvents.indexOf(unresolvedEvent) + ' succeeded.',
      );
    } catch (error) {
      console.error(
        'executing unresolved event nr. ' +
          unresolvedEvents.indexOf(unresolvedEvent) +
          ' failed with error ' +
          error.message,
      );
      executionError = error.message;
      return executionError;
    }
  };

  const iterateThroughEventArray = async () => {
    let unresolvedFunctions = unresolvedEvents;
    let errorOccurredByIndex = unresolvedEvents.map(_ => null);
    for (const unexecutedFunction of unresolvedEvents) {
      if (typeof unexecutedFunction !== 'function') {
        unresolvedFunctions.splice(
          unresolvedEvents.indexOf(unexecutedFunction),
          1,
        );
        continue;
      } else {
        let error = await executeUnresolvedEvent(unexecutedFunction);
        if (error) {
          errorOccurredByIndex[unresolvedEvents.indexOf(unexecutedFunction)] = {
            error,
            unresolvedEvent: unexecutedFunction,
          };
        }
        unresolvedFunctions.splice(
          unresolvedEvents.indexOf(unexecutedFunction),
          1,
        );
      }
    }
    if (errorOccurredByIndex.some(value => value !== null)) {
      setErrorOccurredBy(errorOccurredByIndex);
    }
    setUnresolvedEvents(unresolvedFunctions);
    setProcessing(false);
  };

  useEffect(() => {
    if (!unresolvedEvents.length || isProcessing) return;
    console.log('unresolvedEvents', unresolvedEvents);
    setProcessing(true);

    setTimeout(iterateThroughEventArray, 2000); // 2 seconds puffer before trying to execute
  }, [unresolvedEvents]);

  return (
    <UnresolvedEventCtx.Provider
      value={{
        unresolvedEvents,
        setUnresolvedEvents,
        errorOccurredBy,
        isProcessing,
      }}
    >
      {children}
    </UnresolvedEventCtx.Provider>
  );
};

export default ExecuteUnresolvedEventProvider;
