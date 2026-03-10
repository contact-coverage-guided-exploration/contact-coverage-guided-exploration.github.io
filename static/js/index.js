document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('[data-real-trial]');
  if (!buttons.length) {
    return;
  }

  const videos = document.querySelectorAll('[data-real-world-view]');
  const updateVideos = (trial) => {
    videos.forEach((video) => {
      const view = video.getAttribute('data-real-world-view');
      if (!view) {
        return;
      }
      const nextSrc = `./ccge_media/real/${trial}/${trial}-${view}_web.mp4`;
      const source = video.querySelector('source');
      const currentSrc = (source && source.getAttribute('src')) || video.getAttribute('src') || video.currentSrc;
      video.pause();
      if (source) {
        source.setAttribute('src', nextSrc);
      }
      video.setAttribute('src', nextSrc);
      if (!currentSrc || !currentSrc.endsWith(nextSrc)) {
        video.load();
      } else {
        video.currentTime = 0;
      }
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    });
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((btn) => btn.classList.remove('is-active'));
      button.classList.add('is-active');
      updateVideos(button.getAttribute('data-real-trial'));
    });
  });

  const activeButton = document.querySelector('.real-world-button.is-active') || buttons[0];
  if (activeButton) {
    updateVideos(activeButton.getAttribute('data-real-trial'));
  }
});
