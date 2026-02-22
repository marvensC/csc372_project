//Marvens Sainterlien
//2/08/2026
//portfolio javascript file


const portfolioMedia = [
  { type: 'image', src: 'images/portfolio/img_0022.jpeg' },
  { type: 'video', youtubeId: 'xHGsFL_f2No' },
  { type: 'video', youtubeId: 'VRUrc2k2IMo' },
  { type: 'video', youtubeId: 'EDWb5IyBvHU' },
  { type: 'video', youtubeId: 'CJbbQHXOnnc' },
  { type: 'video', youtubeId: 'bv9DmRs1-9E' },
  { type: 'video', youtubeId: '1RTsUeKM9W8' },
  { type: 'video', youtubeId: 'Il1ULMYA5_A'},
  { type: 'video', youtubeId: '15V4eRL-ZHg'},
  { type: 'image', src: 'images/portfolio/img3.jpg'},
  { type: 'video', youtubeId: 'OK3B7ytA0Jk'},
  { type: 'video', youtubeId: 'GgS2OyXi56E'},
  { type: 'video', youtubeId: 'gL0jaoi-M3w'},
  { type: 'video', youtubeId: 'qbb30hHiExA'},
  { type: 'video', youtubeId: 'FIb6duFXL4U'},
];



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
  createPortfolio(previewPortfolio, portfolioMedia);
}

const fullPortfolio = document.querySelector('.full-portfolio');
if (fullPortfolio) {
  createPortfolio(fullPortfolio, portfolioMedia);
}
