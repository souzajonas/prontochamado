import styles from './Moldura.module.css'

interface MolduraProps {
  children: React.ReactNode
  nome: string
  sala?: string
}

export function Moldura({ children, nome }: MolduraProps) {
  return (
    <div className={styles.container_left_window}>
      <div className={styles.container_frame_prof}>
        <div className={styles.container_prof}>
          <div className={styles.container_title_prof}>
            <span>{nome}</span>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
