import PortfolioScroll from '../components/PortfolioScroll'
import styles from './Portfolio.module.css'

export default function Portfolio() {
  return (
    <div className={styles.page}>
      <h1>Portfolio</h1>
      <PortfolioScroll preview={false} />
    </div>
  )
}
