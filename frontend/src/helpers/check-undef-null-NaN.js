function containsUndefinedNullNaN(...args) {
  // Prüfung jedes Arguments auf undefined, null, oder NaN
  return args.some(
    arg => arg === undefined || arg === null || Number.isNaN(arg),
  );
}

export default containsUndefinedNullNaN;
