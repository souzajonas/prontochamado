import styles from './ButtounInicial.module.css'
interface ButtonInicialProps {
  texto: string
  sala?: string
}

export function ButtouInicial({ texto, sala }: ButtonInicialProps) {
  return (
    <button className={styles.button}>
      <span className={styles.textoNome}>{texto}</span>
      <span className={styles.textoSala}>
        {sala != null ? 'Sala ' + sala : null}
      </span>
    </button>
  )
}
