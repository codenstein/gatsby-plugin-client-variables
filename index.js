module.exports = (function () {
  return (
    (typeof window !== "undefined"
      ? window["$$client-variables"]
      : process.env) || {}
  );
})();
