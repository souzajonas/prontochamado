'use client'

import { useEffect, useState } from 'react'
import styles from './Call.module.css'
import { Chamada } from '../../utils/connect'
import { unstable_noStore as noStore } from 'next/cache';

interface CallProps {
  ultimo?: Chamada
}

export function Call({ ultimo }: CallProps) {
  noStore()
  const [isBlinking, setBlinking] = useState(false)
  const [ultimoChamado, setChamado] = useState<Chamada>()

  useEffect(() => {
    if (ultimo && ultimo.paciente) {
      setChamado(ultimo)
      setBlinking(true)

      // Função para verificar se as vozes estão carregadas
      // const startSpeechSynthesis = () => {
      //   const speech = window.speechSynthesis
      //   const voices = speech.getVoices()

      //   if (voices.length > 0) {
      //     const msg = new SpeechSynthesisUtterance()

      //     msg.rate = 0.8
      //     msg.pitch = 0
      //     msg.lang = 'pt-BR'
      //     msg.text = `Chamando ${ultimo.paciente}, atendimento ${ultimo.atendimento}, Sala ${ultimo.sala}`

      //     msg.onstart = () => {
      //       console.log('Síntese Iniciada.')
      //     }

      //     msg.onend = () => {
      //       console.log('Síntese Concluída.')
      //     }

      //     msg.onerror = (error) => {
      //       console.log(error)
      //     }
      //     msg.voice = voices[0]
      //       speech.speak(msg)
      //       speech.speak(msg)
      //   }
      // }

      //window.speechSynthesis.onvoiceschanged = startSpeechSynthesis

      //startSpeechSynthesis()
      const timeout = setTimeout(() => {
        setBlinking(false)
      }, 5000)
      return () => {
        //window.speechSynthesis.onvoiceschanged = null
        clearTimeout(timeout)
      }
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
