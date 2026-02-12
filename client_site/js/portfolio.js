//array of media
const portfolioMedia = [
  { type: 'image', src: 'images/portfolio/IMG_0022.jpeg' },
  { type: 'video', youtubeId: 'xHGsFL_f2No' },
  { type: 'video', youtubeId: 'VRUrc2k2IMo' },
  { type: 'video', youtubeId: 'EDWb5IyBvHU' },
  { type: 'video', youtubeId: 'CJbbQHXOnnc' },
  { type: 'video', youtubeId: 'bv9DmRs1-9E' },
  { type: 'video', youtubeId: '1RTsUeKM9W8' },
  { type: 'video', youtubeId: 'Il1ULMYA5_A'},
  { type: 'video', youtubeId: '15V4eRL-ZHg'},
  { type: 'image', src: 'images/portfolio/467265DE-F487-4BE4-900C-B21FF4222D21.jpg'},
  { type: 'video', youtubeId: 'OK3B7ytA0Jk'},
  { type: 'video', youtubeId: 'GgS2OyXi56E'},
  { type: 'video', youtubeId: 'gL0jaoi-M3w'},
  { type: 'video', youtubeId: 'qbb30hHiExA'},
  { type: 'video', youtubeId: 'FIb6duFXL4U'},
];

//pasue out of view
const portfolio = document.querySelector('.portfolio');

portfolioMedia.forEach(media => {
  const div = document.createElement('div');
  div.className = 'portfolio-items';
  
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
  
  portfolio.appendChild(div);
});