'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { Footer } from './Footer'
import { Header } from './Header'
import { Moldura } from './Moldura'
import styles from './Recepcao.module.css'
import { ListaChamadaAdmin } from './ListaChamadaAdmin'
import { useEffect, useState } from 'react'
import { Chamada } from '../../utils/connect'
import axios, { AxiosResponse } from 'axios'

type FormValues = {
  paciente: string
  consultorio: string
  prioritario: boolean
}

export function RecepcaoPage() {

  const [listaChamadas, setListaChamadas] = useState<Chamada[]>([])
  const [chamadaCont, setChamadaCont] = useState(0)

  async function criarChamada(dados: FormValues) {
    console.log(dados)
    const chamada: Chamada = {
      atendimento: dados.consultorio.split(' ').shift()!,
      paciente: dados.paciente.toUpperCase(),
      status: 'espera',
      prioritario: dados.prioritario === true ? 'S' : 'N',
      sala: parseInt(
        dados.consultorio.charAt(dados.consultorio.length - 1),
        10,
      ),
      data: new Date().toISOString(),
      identificacao: dados.consultorio,
    }

    // POST NA ROTA PARA CRIAR
    try {
      const response: AxiosResponse<{ id: number }> = await axios.post(
        '/api/',
        chamada,
      )
      console.log("aqui")
      setChamadaCont(chamadaCont + 1)
      return response.data.id
    } catch (error) {
      console.log('Erro ao inserir chamada:', error)
      throw error
    }
  }

  useEffect(() => {
    const fetchChamadas = async () => {
      try {
        const response = await axios.get<Chamada[]>(
          '/api/chamadas/status/espera',
        )
        setListaChamadas(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    
    fetchChamadas()

    const intervalId = setInterval(fetchChamadas, 20000) // Intervalo de 5 segundos

    return () => clearInterval(intervalId)
  }, [chamadaCont])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    criarChamada(data)
    reset({
      paciente: '',
    })
  }

  return (
    <div className={styles.page}>
      <Header />
      <Moldura nome="Recepção">
        <div className={styles.container}>
          <form className={styles.formulario} onSubmit={handleSubmit(onSubmit)}>
            <input
              className={styles.paciente}
              type="text"
              placeholder="Paciente"
              {...register('paciente')}
            />
            <select className={styles.consultorio} {...register('consultorio')}>
              <option value="Médico Sala 1">Médico Sala 1</option>
              <option value="Médico Sala 2">Médico Sala 2</option>
              <option value="Odontológico Sala 3">Odontológico Sala 3</option>
              <option value="Enfermagem Sala 4">Enfermagem Sala 4</option>
              <option value="Acolhimento Sala 5">Acolhimento Sala 5</option>
              <option value="Vacinas Sala 6">Vacinas Sala 6</option>
            </select>
            <div className={styles.prioritario}>
              <h1 className={styles.prioritarioTexto}>Prioritário</h1>
              <input
                className={styles.prioritarioInput}
                type="checkbox"
                placeholder="Prioritário"
                {...register('prioritario', {})}
              />
            </div>

            <input
              className={styles.botao}
              type="submit"
              placeholder="Cadastrar"
            />
          </form>
          <ListaChamadaAdmin listaChamada={listaChamadas} />
        </div>
      </Moldura>
      <Footer />
    </div>
  )
}