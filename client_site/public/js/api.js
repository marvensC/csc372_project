//Marvens Sainterlien
//2/15/2026
//unsplash API page


const apiKey="U1-Z5-MN0b5aGajVKnoQqjNIYBKK8orQFSlkhsyo3lo"

let gallery;


async function getImages(searchTerm) {
  gallery = document.getElementById("gallery");



  const url = 'https://api.unsplash.com/search/photos?client_id='+apiKey+'&query='+searchTerm+'&per_page=15';
  

  gallery.innerHTML = '<p style="color: white; text-align: center;">Loading...</p>';

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    displayImages(data);
  }
  catch (error) {
   console.log(error);
    gallery.innerHTML = '<p style="color: white; text-align: center;">Error loading images</p>';
  }
}

function displayImages(data) {
  gallery = document.getElementById("gallery");
  gallery.innerHTML = '';

  const images = data.results

  if (images.length === 0) {
    gallery.innerHTML = '<p style="color: white; text-align: center;">No images found</p>';
    return;
  }

  images.forEach(imgdata => {
    const img = document.createElement('img');
    img.src = imgdata.urls.small;
    img.alt = imgdata.alt_description || 'Hair style';
    img.title = imgdata.user.name;
    gallery.appendChild(img);
  });
}


//service buttons 

const serviceBtns = document.querySelectorAll('.service-btn');

serviceBtns.forEach(btn => {
  btn.addEventListener('click', function() {

    //revove active from buttons
    serviceBtns.forEach(b => b.classList.remove('active'));

    //add active to clicked btn
    this.classList.add('active');

    const searchTerm = this.dataset.search;
    getImages(searchTerm);
  });
});

//default
getImages('braids');