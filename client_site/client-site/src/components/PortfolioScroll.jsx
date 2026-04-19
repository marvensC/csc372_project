import styles from './PortfolioScroll.module.css'

const portfolioMedia = [
  { type: 'image', src: '/images/portfolio/IMG_0022.jpeg' },
  { type: 'video', youtubeId: 'xHGsFL_f2No' },
  { type: 'video', youtubeId: 'VRUrc2k2IMo' },
  { type: 'video', youtubeId: 'EDWb5IyBvHU' },
  { type: 'video', youtubeId: 'CJbbQHXOnnc' },
  { type: 'video', youtubeId: 'bv9DmRs1-9E' },
  { type: 'video', youtubeId: '1RTsUeKM9W8' },
  { type: 'video', youtubeId: 'Il1ULMYA5_A' },
  { type: 'video', youtubeId: '15V4eRL-ZHg' },
  { type: 'image', src: '/images/portfolio/img3.jpg' },
  { type: 'video', youtubeId: 'OK3B7ytA0Jk' },
  { type: 'video', youtubeId: 'GgS2OyXi56E' },
  { type: 'video', youtubeId: 'gL0jaoi-M3w' },
  { type: 'video', youtubeId: 'qbb30hHiExA' },
  { type: 'video', youtubeId: 'FIb6duFXL4U' },
]

export default function PortfolioScroll({ preview = false }) {
  const media = preview ? portfolioMedia.slice(0, 6) : portfolioMedia

  return (
    <div className={styles.frame}>
      <div className={`${styles.scroll} ${preview ? styles.preview : styles.full}`}>
        {media.map((item, i) => (
          <div key={i} className={styles.item}>
            {item.type === 'video' ? (
              <iframe
                src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${item.youtubeId}&controls=0&modestbranding=1&rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`Portfolio video ${i + 1}`}
              />
            ) : (
              <img src={item.src} alt={`Portfolio item ${i + 1}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
