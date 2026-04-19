import { useEffect } from 'react'
import styles from './ContactModal.module.css'

export default function ContactModal({ isOpen, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label="Close">&times;</button>
        <h2>Contact Us</h2>
        <p className={styles.info}>
          Have a question or want to know more? Reach out directly.
        </p>
        <div className={styles.details}>
          <div className={styles.detail}>
            <span className={styles.label}>Email</span>
            <a href="mailto:sainterlienchristie1907@gmail.com">saintlybeauty@gmail.com</a>
          </div>
          <div className={styles.detail}>
            <span className={styles.label}>Instagram</span>
            <a href="#" target="_blank" rel="noreferrer">@saintlybeauty</a>
          </div>
          <div className={styles.detail}>
            <span className={styles.label}>TikTok</span>
            <a href="#" target="_blank" rel="noreferrer">@saintlybeauty</a>
          </div>
        </div>
      </div>
    </div>
  )
}
