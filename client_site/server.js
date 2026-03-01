//Marvens Sainterlien
//2/21/2026
//Express server

// Load the Express module
const express = require('express');

// Load the Express Handlebars module
const { engine } = require('express-handlebars');

// Create an Express application
const app = express();

// Define the port number
const PORT = 3000;

// Configure Handlebars as the view engine with default layout set to main
app.engine('handlebars', engine({
  defaultLayout: 'main',
  helpers: {
    json: (context) => JSON.stringify(context)
  }
}));

app.set('view engine', 'handlebars');
app.set('views', './views');

// Configure Express to serve static files from the public folder
app.use(express.static('public'));

// Parse form data from POST requests
app.use(express.urlencoded({ extended: false }));


// Portfolio media data
const portfolioMedia = [
  { type: 'image', src: 'images/portfolio/img_0022.jpeg' },
  { type: 'video', youtubeId: 'xHGsFL_f2No' },
  { type: 'video', youtubeId: 'VRUrc2k2IMo' },
  { type: 'video', youtubeId: 'EDWb5IyBvHU' },
  { type: 'video', youtubeId: 'CJbbQHXOnnc' },
  { type: 'video', youtubeId: 'bv9DmRs1-9E' },
  { type: 'video', youtubeId: '1RTsUeKM9W8' },
  { type: 'video', youtubeId: 'Il1ULMYA5_A' },
  { type: 'video', youtubeId: '15V4eRL-ZHg' },
  { type: 'image', src: 'images/portfolio/img3.jpg' },
  { type: 'video', youtubeId: 'OK3B7ytA0Jk' },
  { type: 'video', youtubeId: 'GgS2OyXi56E' },
  { type: 'video', youtubeId: 'gL0jaoi-M3w' },
  { type: 'video', youtubeId: 'qbb30hHiExA' },
  { type: 'video', youtubeId: 'FIb6duFXL4U' },
];

// Service categories data
const serviceCategories = [
  { label: 'Braids',       search: 'braids',            active: true },
  { label: 'Cornrows',     search: 'cornrows',           active: false },
  { label: 'Locs',         search: 'dreadlocks-black',   active: false },
  { label: 'Twists',       search: 'twisted-braid-hair', active: false },
  { label: 'Natural Hair', search: 'curly hair',         active: false },
];


// Routes
app.get('/', (req, res) => {
  res.render('home', {
    activePage: 'home',
    previewMedia: portfolioMedia
  });
});

app.get('/services', (req, res) => {
  res.render('services', {
    activePage: 'services',
    serviceCategories: serviceCategories
  });
});

app.get('/appointments', (req, res) => {
  res.render('appointments', {
    activePage: 'appointments',
    calendlyUrl: 'https://calendly.com/sainterlienchristie1907/hair-appointment?hide_gdpr_banner=1&primary_color=ff8c00'
  });
});

app.get('/portfolio', (req, res) => {
  res.render('portfolio', {
    activePage: 'portfolio',
    portfolioMedia: portfolioMedia
  });
});

app.post('/contact', (req, res) => {
  console.log('Contact form submitted:', req.body);
  res.redirect('/');
});


// 404 catch-all
app.use((req, res) => {
  res.status(404).render('404');
});

// 500 error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500');
});


// Tell the server which port to listen on and output the URL to the console
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});