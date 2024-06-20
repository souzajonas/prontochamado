'use client'
import { Chamada } from '../../utils/connect'
import styles from './ListaChamada.module.css'

interface ListaChamadaProps {
  listaChamada: Array<Chamada>
}

export function ListaChamada({ listaChamada }: ListaChamadaProps) {
  return (
    <div className={styles.container_list}>
      <div className={styles.list_title}>
        <span>ULTIMOS CHAMADOS</span>
      </div>
      <table>
        <thead>
          <tr>
            <th className={styles.col_nomes_h}>PACIENTE</th>
            <th className={styles.col_atd}>ATENDIMENTO</th>
            <th className={styles.col_tab}>SALA</th>
          </tr>
        </thead>
        <tbody>
          {listaChamada.map((item, index) => (
            <tr key={index}>
              <td className={styles.col_nomes}>{item.paciente}</td>
              <td className={styles.col_atd}>{item.atendimento}</td>
              <td className={styles.col_tab}>{item.sala}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
