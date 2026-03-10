document.addEventListener('DOMContentLoaded', () => {
  const replayButtons = document.querySelectorAll('[data-replay-target]');
  replayButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const targetSelector = button.getAttribute('data-replay-target');
      if (!targetSelector) {
        return;
      }
      const container = document.querySelector(targetSelector);
      if (!container) {
        return;
      }
      const videos = container.querySelectorAll('video');
      videos.forEach((video) => {
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {});
        }
      });
    });
  });
});
