import Image from 'next/image'
import styles from './HeaderPainel.module.css'

export function HeaderPainel() {
  return (
    <div className={styles.container_top}>
      <div className={styles.left_top}>
        <div className={styles.icon_top}>
          <Image width={200} height={200} className={styles.logo} src="/img_mun.png" alt="" />
        </div>
      </div>
      <div className={styles.right_top}>
        <div className={styles.title_top}>
          <span>ESF Padre Santos Spricigo</span>
        </div>
      </div>
    </div>
  )
}
