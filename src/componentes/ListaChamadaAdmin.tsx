import { ChamadaDAO } from '../services/ChamadasService'
import styles from './ListaChamadaAdmin.module.css'

interface ListaChamadaAdminProps {
  listaChamada: Array<ChamadaDAO>
}

export function ListaChamadaAdmin({ listaChamada }: ListaChamadaAdminProps) {
  return (
    <div className={styles.container_list}>
      <div className={styles.list_title}>FILA ESPERA</div>
      <div className={styles.tabela}>
        <table>
          <thead>
            <tr>
              <th className={styles.col_nomes_h}>PACIENTE</th>
              <th className={styles.col_tab}>PRIORITÁRIO</th>
              <th className={styles.col_atd}>ATENDIMENTO</th>
              <th className={styles.col_tab}>SALA</th>
            </tr>
          </thead>
          <tbody>
            {listaChamada.map((item, index) => (
              <tr key={index}>
                <td className={styles.col_nomes}>{item.paciente}</td>
                <td className={styles.col_atd}>
                  {item.prioritario === 'S' ? 'Sim' : 'Não'}
                </td>
                <td className={styles.col_atd}>{item.atendimento}</td>
                <td className={styles.col_tab}>{item.sala}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
