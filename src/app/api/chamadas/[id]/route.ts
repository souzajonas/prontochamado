import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  noStore()
  const { id } = params;
  const { paciente, atendimento, sala, prioritario, data, identificacao, status, horaChamado } = await req.json();

  const result = await sql`UPDATE chamadas SET paciente = ${paciente}, atendimento = ${atendimento}, sala = ${sala}, prioritario = ${prioritario}, data = ${data}, identificacao = ${identificacao}, status = ${status}, horaChamado = ${horaChamado} WHERE id = ${id};`

  if (result.rowCount === 0) {
    return new Response(JSON.stringify({ message: 'Chamada não encontrada' }), { status: 404 });
  }

  return new Response(JSON.stringify({ message: 'Chamada atualizada com sucesso' }), { status: 200 });
}