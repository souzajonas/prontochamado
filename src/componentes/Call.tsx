'use client'

import { useEffect, useState } from 'react'
import styles from './Call.module.css'
import { Chamada } from '../../utils/connect'
import { unstable_noStore as noStore } from 'next/cache';
import axios from 'axios';

interface CallProps {
  ultimo?: Chamada
}

export function Call({ ultimo }: CallProps) {
  noStore()
  const [isBlinking, setBlinking] = useState(false)
  const [ultimoChamado, setChamado] = useState<Chamada>()
  const [audio] = useState(new Audio())
  

  useEffect(() => {
    if (ultimo && ultimo.paciente) {
      setChamado(ultimo)
      setBlinking(true)

      const buscarAudio = async () => {
        var count = 0
        try {
          const response = await axios.post('/api/chamadas/audio', { texto: `Chamando ${ultimo.paciente}, atendimento ${ultimo.atendimento}, Sala ${ultimo.sala}` }, { responseType: 'blob' })

          const audioUrl = URL.createObjectURL(response.data)
          audio.src = audioUrl
          audio.play()
          count = 1

          audio.onended = () => {
            if (count === 1) {
              count = 2
              audio.play()
            }
          }
        } catch (error) {
          console.error('Erro ao buscar o áudio:', error)
        }
      }
      buscarAudio()
    }
  }, [ultimo])
  /**  */
  return (
    <div className={styles.container_call}>
      <table>
        <thead>
          <tr>
            <th className={styles.col_hnome}>PACIENTE</th>
            <th className={styles.col_hatendimento}>ATENDIMENTO</th>
            <th className={styles.col_hsala}>SALA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              className={`${styles.col_header} ${isBlinking ? 'blinking' : ''}`}
            >
              {ultimoChamado?.paciente}
            </td>  
            <td
              className={`${styles.col_header} ${isBlinking ? 'blinking' : ''}`}
            >
              {ultimoChamado?.atendimento}
            </td>
            <td
              className={`${styles.col_header} ${isBlinking ? 'blinking' : ''}`}
            >
              {ultimoChamado?.sala}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
