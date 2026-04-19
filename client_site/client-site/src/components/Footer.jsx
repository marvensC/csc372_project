import styles from './Footer.module.css'

export default function Footer({ onContactOpen }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <button className={styles.contactLink} onClick={onContactOpen}>
          Contact Us
        </button>
        <div className={styles.socials}>
          <span className={styles.followText}>Follow Us</span>
          <div className={styles.icons}>
            <a href="#" title="Instagram" aria-label="Instagram">📷</a>
            <a href="#" title="TikTok" aria-label="TikTok">🎵</a>
          </div>
        </div>
      </div>
      <span className={styles.copy}>&copy; 2025 Saintly Beauty</span>
    </footer>
  )
}
