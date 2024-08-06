'use client'

import { ButtouInicial } from './ButtonInicial'
import { Footer } from './Footer'
import { Header } from './Header'
import styles from './InicialPage.module.css'
import Link from 'next/link';

export function InicialPage() {

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.containerButtun}>
        <Link className={styles.link} href={{ pathname: '/painel', query: { nome: 'Painel' } }}>
          <ButtouInicial texto="Painel" />
        </Link>

        <Link
          className={styles.link}
          href={{ pathname: '/recepcao', query: { nome: 'Recepção' } }}
        >
          <ButtouInicial texto="Recepção" />
        </Link>

        <Link
          className={styles.link}
          href={{ pathname: '/sala', query: { sala: 1, nome: 'Médico Sala 1' } }}
        >
          <ButtouInicial texto="Médico" sala="1" />
        </Link>

        <Link
          className={styles.link}
          href={{ pathname: '/sala', query: { sala: 2, nome: 'Farmácia Sala 2' } }}
        >
          <ButtouInicial texto="Farmácia" sala="2" />
        </Link>

        <Link
          className={styles.link}
          href={{ pathname: '/sala', query: { sala: 3, nome: 'Odontológico Sala 3' } }}
        >
          <ButtouInicial texto="Odontológico" sala="3" />
        </Link>

        <Link
          className={styles.link}
          href={{ pathname: '/sala', query: { sala: 4, nome: 'Enfermagem Sala 4' } }}
        >
          <ButtouInicial texto="Enfermagem" sala="4" />
        </Link>

        <Link
          className={styles.link}
          href={{ pathname: '/sala', query: { sala: 5, nome: 'Acolhimento Sala 5' } }}
        >
          <ButtouInicial texto="Acolhimento" sala="5" />
        </Link>

        <Link
          className={styles.link}
          href={{ pathname: '/sala', query: { sala: 6, nome: 'Vacinas Sala 6' } }}
        >
          <ButtouInicial texto="Vacinas" sala="6" />
        </Link>

        <Link
          className={styles.link}
          href={{ pathname: '/sala', query: { sala: 7, nome: 'Psicóloga Sala 7' } }}
        >
          <ButtouInicial texto="Psicóloga" sala="7" />
        </Link>
      </div>
      <Footer />
    </div>
  )
}
