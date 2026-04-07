function createConsoleNotifier() {
  return {
    async notify(result) {
      if (result.success) {
        // Notification adapter for early backend iterations.
        console.info(result.message);
        return;
      }

      console.error(result.message);
    },
  };
}

module.exports = {
  createConsoleNotifier,
};
