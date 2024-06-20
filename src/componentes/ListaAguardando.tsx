export type PacienteAguardando = {
  cidadao: string
  service: string
  risco: string
  status: number
}

interface ListaAguardandoProps {
  agdList: Array<PacienteAguardando>
}

export function ListaAguardando({ agdList }: ListaAguardandoProps) {
  return (
    <div className="recepcao_list">
      <table>
        <thead>
          <tr>
            <th className="col_nome">CIDADÃO</th>
            <th className="col_senha">ATENDIMENTO</th>
            <th className="col_senha">RISCO</th>
          </tr>
        </thead>
        <tbody>
          {agdList.map(
            (item, index) =>
              item.status === 1 && (
                <tr key={index}>
                  <td className="col_nome">{item.cidadao}</td>
                  <td className="col_senha">{item.service}</td>
                  <td className="col_senha">{item.risco}</td>
                </tr>
              ),
          )}
        </tbody>
      </table>
    </div>
  )
}
