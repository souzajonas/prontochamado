'use client'

import { Footer } from './Footer'
import { Header } from './Header'
import { Moldura } from './Moldura'
import styles from './SalaPage.module.css'
import { ListaChamadaAdmin } from './ListaChamadaAdmin'
import { useEffect, useState } from 'react'
import { Chamada } from '../../utils/connect';
import axios, { AxiosResponse } from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form'

type FormValues = {
  consultorio: string
  prioritario: boolean
}

interface SalaPagePropos {
  nome: string
  sala: string
}

export function SalaPage({ sala, nome }: SalaPagePropos) {

  const [listaChamadas, setListaChamadas] = useState<Chamada[]>([])
  const [pacienteAtual, setPacienteAtual] = useState<Chamada>()

  async function criarChamada(dados: FormValues) {
    const dataAtual = new Date();

    const chamada: Chamada = {
      atendimento: dados.consultorio.split(' ').shift()!,
      paciente: pacienteAtual!.paciente.toUpperCase(),
      status: 'espera',
      prioritario: dados.prioritario === true ? 'S' : 'N',
      sala: parseInt(
        dados.consultorio.charAt(dados.consultorio.length - 1),
        10,
      ),
      data: new Date(dataAtual.getTime() - (dataAtual.getTimezoneOffset() * 60000)).toISOString(),
      identificacao: dados.consultorio,
    }

    // POST NA ROTA PARA CRIAR
    try {
      const response: AxiosResponse<{ id: number }> = await axios.post(
        '/api/',
        chamada,
      )
      return response.data.id
    } catch (error) {
      console.log('Erro ao inserir chamada:', error)
      throw error
    }
  }

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (pacienteAtual?.paciente !== null){
      criarChamada(data)
      let paciente = pacienteAtual
      paciente!.paciente = ''
      setPacienteAtual(paciente)
    }
  }

  return (
    <div className={styles.page}>
      <Header />
      <Moldura nome={nome}>
        <div className={styles.container}>
          <div className={styles.chamar}>
            <div className={styles.acao}>
              <button className={styles.botaoChamar} onClick={alterarPaciente}>
                Chamar Próximo
              </button>
              <form className={styles.formulario} onSubmit={handleSubmit(onSubmit) }>
                <select className={styles.consultorio} {...register('consultorio')}>
                  <option value="Médico Sala 1">Médico Sala 1</option>
                  <option value="Farmácia Sala 2">Farmácia Sala 2</option>
                  <option value="Odontológico Sala 3">Odontológico Sala 3</option>
                  <option value="Enfermagem Sala 4">Enfermagem Sala 4</option>
                  <option value="Acolhimento Sala 5">Acolhimento Sala 5</option>
                  <option value="Vacinas Sala 6">Vacinas Sala 6</option>
                  <option value="Psicóloga Sala 7">Psicóloga Sala 7</option>
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
                  value="Encaminhar"
                />
              </form>
            </div>
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
