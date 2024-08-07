'use client'

import { Footer } from './Footer'
import { Header } from './Header'
import { Moldura } from './Moldura'
import styles from './SalaPage.module.css'
import { ListaChamadaAdmin } from './ListaChamadaAdmin'
import { useEffect, useState } from 'react'
import { Chamada } from '../../utils/connect';
import axios from 'axios';

interface SalaPagePropos {
  nome: string
  sala: string
}

export function SalaPage({ sala, nome }: SalaPagePropos) {

  const [listaChamadas, setListaChamadas] = useState<Chamada[]>([])
  const [pacienteAtual, setPacienteAtual] = useState<Chamada>()

  async function alterarPaciente() {
    let paciente: Chamada
    if (pacienteAtual !== null && typeof pacienteAtual === 'object') {
      paciente = pacienteAtual
      paciente.status = 'atendido'
      paciente.horaChamado = null

      try {
        await axios.put(`/api/chamadas/${paciente.id!}`, paciente)
      } catch (error) {
        console.error(
          `Erro ao atualizar chamada com ID ${paciente.id!}:`,
          error,
        )
        throw error
      }
    }
    paciente = listaChamadas[0]
    paciente.status = 'atual'

    try {
      await axios.put(`/api/chamadas/${paciente.id!}`, paciente)
    } catch (error) {
      console.error(
        `Erro ao atualizar chamada com ID ${paciente.id!}:`,
        error,
      )
      throw error
    }

    setPacienteAtual(paciente)
  }

  //Atualiza a lista
  useEffect(() => {
    const fetchChamadas = async () => {
      try {
        const response = await axios.get<Chamada[]>(
          `/api/chamadas/sala/${sala}`,
        )
        setListaChamadas(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchChamadas()

    const intervalId = setInterval(fetchChamadas, 25000)

    return () => clearInterval(intervalId)
  }, [pacienteAtual])

  return (
    <div className={styles.page}>
      <Header />
      <Moldura nome={nome}>
        <div className={styles.container}>
          <div className={styles.chamar}>
            <button className={styles.botaoChamar} onClick={alterarPaciente}>
              Chamar Próximo
            </button>
            <div className={styles.atual}>
              <h1>Paciente Atual: {pacienteAtual?.paciente}</h1>
            </div>
          </div>
          <ListaChamadaAdmin listaChamada={listaChamadas} />
        </div>
      </Moldura>
      <Footer />
    </div>
  )
}
