import styles from './BookNow.module.css'

export default function BookNow() {
  return (
    <div className={styles.page}>
      <h1>Book Your Appointment</h1>
      <div className={styles.calendlyWrapper}>
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/sainterlienchristie1907/hair-appointment?hide_gdpr_banner=1&primary_color=ff8c00"
          style={{ minWidth: '320px', height: '700px' }}
        />
        <script
          type="text/javascript"
          src="https://assets.calendly.com/assets/external/widget.js"
          async
        />
      </div>
    </div>
  )
}
