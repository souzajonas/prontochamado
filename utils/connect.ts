import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

export type Chamada = {
  id?: number;
  paciente: string;
  atendimento: string;
  sala: number;
  prioritario: string;
  data: string;
  identificacao: string;
  status: string;
  horaChamado?: string | null;
}

const databaseDirectory = path.resolve(process.cwd(), 'data', 'database.db');

// Abre o banco de dados diretamente no arquivo
export const dbConnect = open({
  filename: databaseDirectory,
  driver: sqlite3.Database,
});

