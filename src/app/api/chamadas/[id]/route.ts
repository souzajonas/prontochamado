import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';
import supabase from '../../../../../utils/supabase-connect';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  noStore();
  const { id } = params;
  const { paciente, atendimento, sala, prioritario, data, identificacao, status, horaChamado } = await req.json();

  var horachamado = horaChamado

  const { data: updateData, error: updateError } = await supabase
    .from('chamadas')
    .update({
      paciente,
      atendimento,
      sala,
      prioritario,
      data,
      identificacao,
      status,
      horachamado
    })
    .eq('id', id);

  if (updateError) {
    return new Response(JSON.stringify({ message: 'Erro ao atualizar chamada', error: updateError.message }), { status: 500 });
  }
  
  return new Response(JSON.stringify({ message: 'Chamada atualizada com sucesso' }), { status: 200 });
}
