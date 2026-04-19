import { useState } from 'react'
import ServiceCard from '../components/ServiceCard'
import styles from './Services.module.css'

const services = [
  { id: 1, name: 'Braids',       searchTerm: 'braids',             price: 80.00, durationMinutes: 180, description: 'Classic and creative braiding styles tailored to your length and preference.' },
  { id: 2, name: 'Cornrows',     searchTerm: 'cornrows',           price: 60.00, durationMinutes: 120, description: 'Neat, sleek cornrow patterns customized for any occasion or everyday wear.' },
  { id: 3, name: 'Locs',         searchTerm: 'dreadlocks-black',   price: 100.00,durationMinutes: 240, description: 'Starter locs, retwists, and maintenance to keep your locs healthy and defined.' },
  { id: 4, name: 'Twists',       searchTerm: 'twisted-braid-hair', price: 75.00, durationMinutes: 150, description: 'Two-strand and passion twists for a beautiful protective style with natural movement.' },
  { id: 5, name: 'Natural Hair', searchTerm: 'curly hair',         price: 65.00, durationMinutes: 90,  description: 'Wash-and-go, twist-outs, and styling that celebrates your natural curl pattern.' },
]

const UNSPLASH_ACCESS_KEY = 'U1-Z5-MN0b5aGajVKnoQqjNIYBKK8orQFSlkhsyo3lo'

export default function Services() {
  const [activeId, setActiveId]   = useState(1)
  const [images, setImages]       = useState([])
  const [loading, setLoading]     = useState(false)
  const [imgError, setImgError]   = useState('')

  const fetchImages = async (searchTerm) => {
    if (!UNSPLASH_ACCESS_KEY || UNSPLASH_ACCESS_KEY === 'YOUR_UNSPLASH_KEY') {
      setImages([])
      setImgError('Add your Unsplash API key to enable the gallery.')
      return
    }
    setLoading(true)
    setImgError('')
    try {
      const res  = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchTerm)}&per_page=9&client_id=${UNSPLASH_ACCESS_KEY}`
      )
      const data = await res.json()
      setImages(data.results || [])
      if (!data.results?.length) setImgError('No images found for this service.')
    } catch {
      setImgError('Could not load gallery images.')
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (service) => {
    setActiveId(service.id)
    fetchImages(service.searchTerm)
  }

  return (
    <div className={styles.page}>
      <h1>Services</h1>

      <div className={styles.cards}>
        {services.map(service => (
          <ServiceCard
            key={service.id}
            service={service}
            isActive={activeId === service.id}
            onClick={() => handleSelect(service)}
          />
        ))}
      </div>

      <div className={styles.galleryFrame}>
        {loading && <p className={styles.status}>Loading gallery...</p>}
        {!loading && imgError && <p className={styles.status}>{imgError}</p>}
        {!loading && !imgError && images.length > 0 && (
          <div className={styles.gallery}>
            {images.map(img => (
              <img
                key={img.id}
                src={img.urls.small}
                alt={img.alt_description || 'Hair service'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
