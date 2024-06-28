import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    const result =
      await sql`CREATE TABLE IF NOT EXISTS chamadas (
    id SERIAL PRIMARY KEY,
    paciente TEXT NOT NULL,
    atendimento TEXT NOT NULL,
    sala INTEGER NOT NULL,
    prioritario TEXT NOT NULL,
    data TIMESTAMP NOT NULL,
    identificacao TEXT NOT NULL,
    status TEXT NOT NULL,
    horaChamado TIMESTAMP
);`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}