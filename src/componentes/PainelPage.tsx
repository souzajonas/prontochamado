'use client'
import { useEffect, useState } from 'react'
import { Header } from './Header'
import { Call } from './Call'
import { ListaChamada } from './ListaChamada'
import { Footer } from './Footer'
import styles from './Painel.module.css'
import { Chamada } from '../../utils/connect'
import axios from 'axios'

export function PainelPage() {
  // máximo 4
  const [listaCall, setListaCall] = useState<Chamada[]>([])
  const [ultimo, setUltimo] = useState<Chamada>()

  const fetchChamadas = async () => {
    try {
      const response = await axios.get<Chamada[]>(`/api/chamadas/data`)
      setListaCall(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchChamadaAtual = async () => {
    try {
      let response
      let chamada: Chamada

      if (ultimo) {
        response = await axios.get<Chamada[]>(
          `/api/chamadas/chamar/${ultimo.id}`,
        )
        if (response.data.length > 0) {
          chamada = ultimo
          chamada.horaChamado = new Date().toISOString()

          try {
            await axios.put(`/api/chamadas/${chamada.id!}`, chamada)
          } catch (error) {
            console.error(
              `Erro ao atualizar chamada com ID ${chamada.id!}:`,
              error,
            )
            throw error
          }

        }
      } else {
        response = await axios.get<Chamada[]>(`/api/chamadas/chamar/0`)
      }
      if (response.data.length > 0) {
        setUltimo(response.data[0])
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchChamadas()
    const intervalId = setInterval(fetchChamadas, 15000) // Intervalo de 5 segundos

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    fetchChamadaAtual()
    const intervalId = setInterval(fetchChamadaAtual, 14000) // Intervalo de 5 segundos

    return () => clearInterval(intervalId)
  }, [ultimo])

  return (
    <div className={styles.App}>
      <div className={styles.container_up}>
        <Header />
      </div>

      <div className={styles.container_center}>
        <div className={styles.container_function}>
          <Call ultimo={ultimo} />
          <ListaChamada listaChamada={listaCall} />
        </div>
      </div>

      <div className={styles.container_down}>
        <Footer />
      </div>
    </div>
  )
}
