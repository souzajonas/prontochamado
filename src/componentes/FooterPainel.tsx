'use client'

import moment from 'moment'
import 'moment/locale/pt-br'
import styles from './FooterPainel.module.css'
import { useEffect, useState } from 'react'

export function FooterPainel() {
  const [clockTime, setClockTime] = useState('00H:00M')

  useEffect(() => {
    const intervalId = setInterval(() => {
      setClockTime(`${moment(new Date()).locale('pt-br').format('LTS')}`)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className={styles.container_footer}>
      <div className={styles.container_text_show}>
        <span>{`${moment(new Date()).locale('pt-br').format('dddd')}, ${moment(new Date()).locale('pt-br').format('LL')}`}</span>
        <span>{clockTime}</span>
      </div>
    </div>
  )
}
