//Marvens Sainterlien
//2/08/2026
//portfolio javascript file

function createPortfolio(container, mediaArray) {
  mediaArray.forEach(media => {
    const div = document.createElement('div');
    if (container.classList.contains('preview-portfolio')) {
      div.className = 'preview-portfolio-items';
    } else if (container.classList.contains('full-portfolio')) {
      div.className = 'portfolio-items';
    }

    if (media.type === 'video') {
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${media.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${media.youtubeId}&controls=0&modestbranding=1&rel=0`;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.loading = "lazy";
      div.appendChild(iframe);
    } else {
      const img = document.createElement('img');
      img.src = media.src;
      img.alt = 'Portfolio item';
      div.appendChild(img);
    }

    container.appendChild(div);
  });
}

const previewPortfolio = document.querySelector('.preview-portfolio');
if (previewPortfolio) {
  createPortfolio(previewPortfolio, previewMedia);
}

const fullPortfolio = document.querySelector('.full-portfolio');
if (fullPortfolio) {
  createPortfolio(fullPortfolio, portfolioMedia);
}