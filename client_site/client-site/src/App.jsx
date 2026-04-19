import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ContactModal from './components/ContactModal'
import Home from './pages/Home'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import BookNow from './pages/BookNow'
import Review from './pages/Review'
import { useState } from 'react'

export default function App() {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <>
      <Header onContactOpen={() => setContactOpen(true)} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/book" element={<BookNow />} />
          <Route path="/review" element={<Review />} />
        </Routes>
      </main>
      <Footer onContactOpen={() => setContactOpen(true)} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  )
}
