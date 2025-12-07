const log = {
  info: (...args) => console.log("", ...args),
  error: (...args) => console.error("", ...args),
  warn: (...args) => console.warn("", ...args),
  debug: (...args) => {
    if (process.env.NODE_ENV === "development") {
      console.log("DEBUG:", ...args);
    }
  }
};

module.exports = log;