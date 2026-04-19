import styles from './ServiceCard.module.css'

export default function ServiceCard({ service, isActive, onClick }) {
  const { name, price, durationMinutes, description } = service

  const formatDuration = (mins) => {
    const h = Math.floor(mins / 60)
    const m = mins % 60
    if (h > 0 && m > 0) return `${h} hr${h > 1 ? 's' : ''} ${m} min`
    if (h > 0)          return `${h} hr${h > 1 ? 's' : ''}`
    return `${m} min`
  }

  return (
    <div
      className={`${styles.card} ${isActive ? styles.active : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
    >
      <h3>{name}</h3>
      <div className={styles.price}>Starting at ${price.toFixed(2)}</div>
      <div className={styles.duration}>⏱ {formatDuration(durationMinutes)}</div>
      <div className={styles.desc}>{description}</div>
    </div>
  )
}
