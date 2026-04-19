import { useState } from 'react'
import styles from './Review.module.css'

const SERVICES = ['Braids', 'Cornrows', 'Locs', 'Twists', 'Natural Hair']

const emptyForm = {
  name:    '',
  email:   '',
  service: '',
  rating:  '',
  review:  '',
}

const emptyErrors = {
  name:    '',
  email:   '',
  service: '',
  rating:  '',
  review:  '',
}

export default function Review() {
  const [values,    setValues]    = useState(emptyForm)
  const [errors,    setErrors]    = useState(emptyErrors)
  const [message,   setMessage]   = useState('')
  const [submitted, setSubmitted] = useState(false)

  // Controlled input handler
  const handleChange = (e) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    // Clear field error on change (immutable update)
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = { ...emptyErrors }
    let valid = true

    if (values.name.trim().length < 2 || values.name.trim().length > 50) {
      newErrors.name = 'Name must be between 2 and 50 characters.'
      valid = false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = 'Please enter a valid email address.'
      valid = false
    }
    if (!SERVICES.includes(values.service)) {
      newErrors.service = 'Please select a valid service.'
      valid = false
    }
    const rating = Number(values.rating)
    if (!values.rating || rating < 1 || rating > 5 || !Number.isInteger(rating)) {
      newErrors.rating = 'Rating must be a whole number between 1 and 5.'
      valid = false
    }
    if (values.review !== '' && (values.review.trim().length < 10 || values.review.trim().length > 500)) {
      newErrors.review = 'Review must be between 10 and 500 characters.'
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) {
      setMessage('Please correct the errors below.')
      return
    }
    setMessage(`Thank you for your review, ${values.name}!`)
    setSubmitted(true)
    setValues(emptyForm)
  }

  const handleAnother = () => {
    setSubmitted(false)
    setMessage('')
    setErrors(emptyErrors)
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2>Leave a Review</h2>

        {message && (
          <p className={submitted ? styles.success : styles.errorMsg}>{message}</p>
        )}

        {submitted ? (
          <div className={styles.thanks}>
            <p>Your feedback means a lot — it helps Saintly Beauty grow! 🙏</p>
            <button className={styles.btn} onClick={handleAnother}>Leave Another Review</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className={styles.form}>

            <div className={styles.field}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Your name"
                autoComplete="name"
              />
              {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="you@email.com"
                autoComplete="email"
              />
              {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="service">Service Received</label>
              <select id="service" name="service" value={values.service} onChange={handleChange}>
                <option value="">-- Select a service --</option>
                {SERVICES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {errors.service && <span className={styles.fieldError}>{errors.service}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="rating">Rating (1–5)</label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={values.rating}
                onChange={handleChange}
                min="1"
                max="5"
                placeholder="1–5"
              />
              {errors.rating && <span className={styles.fieldError}>{errors.rating}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="review">Review <span className={styles.optional}>(optional)</span></label>
              <textarea
                id="review"
                name="review"
                value={values.review}
                onChange={handleChange}
                rows={5}
                placeholder="Tell us about your experience..."
              />
              {errors.review && <span className={styles.fieldError}>{errors.review}</span>}
            </div>

            <button type="submit" className={styles.btn}>Submit Review</button>
          </form>
        )}
      </div>
    </div>
  )
}
