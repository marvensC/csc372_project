import { Link } from 'react-router-dom'
import PortfolioScroll from '../components/PortfolioScroll'
import styles from './Home.module.css'

export default function Home() {
  return (
    <div className={styles.home}>
      <PortfolioScroll preview />

      <section className={styles.hero}>
        <h1>Welcome to Saintly Beauty</h1>
      </section>

      <section className={styles.about}>
        <h2>About</h2>
        <p>
          Saintly Beauty is a home-based hair business dedicated to enhancing natural beauty
          with care, creativity, and professionalism. I provide a warm, welcoming environment
          where clients receive personalized styling, quality hair services with premium products
          designed to make them look and feel heavenly. Whether it's protective styling, custom
          looks, or everyday glam, Saintly Beauty brings salon level excellence to the comfort
          of home. Let your beauty shine gracefully, confidently, and effortlessly.
        </p>
        <div className={styles.ctas}>
          <Link to="/book" className={styles.btnPrimary}>Book Now</Link>
          <Link to="/services" className={styles.btnSecondary}>View Services</Link>
        </div>
      </section>
    </div>
  )
}
