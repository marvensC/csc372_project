//array of media
const portfolioMedia = [
  { type: 'image', src: 'images/portfolio/IMG_0022.jpeg' },
  { type: 'video', src: 'images/portfolio/IMG_0108.MOV' },
  { type: 'video', src: 'images/portfolio/IMG_0805.MOV' },
  { type: 'video', src: 'images/portfolio/IMG_8595.MOV' },
  { type: 'video', src: 'images/portfolio/IMG_8672.MOV' },
  { type: 'video', src: 'images/portfolio/IMG_9811.MOV' },
  { type: 'video', src: 'images/portfolio/IMG_9877.MOV' },
  { type: 'video', src: 'images/portfolio/copy_E194802C-FF57-4842-91BF-3F214B8717CC.mov'},
  { type: 'video', src: 'images/portfolio/IMG_6810.MOV'},
  { type: 'image', src: 'images/portfolio/467265DE-F487-4BE4-900C-B21FF4222D21.jpg'},
  { type: 'video', src: 'images/portfolio/IMG_0332.MOV'},
  { type: 'video', src: 'images/portfolio/IMG_0331.MOV'},
  { type: 'video', src: 'images/portfolio/IMG_0378.MOV'},
  { type: 'video', src: 'images/portfolio/IMG_0329.MOV'},
];


const portfolio = document.querySelector('.portfolio');

portfolioMedia.forEach(media => {
  const div = document.createElement('div');
  div.className = 'portfolio-items';
  
  if (media.type === 'video') {
    const video = document.createElement('video');
    video.src = media.src;
    video.controls = true;
    video.muted = true;
    video.playsInline = true;
    div.appendChild(video);
  } else {
    const img = document.createElement('img');
    img.src = media.src;
    img.alt = 'Portfolio item';
    div.appendChild(img);
  }
  
  portfolio.appendChild(div);
});