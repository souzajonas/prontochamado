// Ajuste o caminho conforme necessário
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';
import supabase from '../../../../../../utils/supabase-connect';

export async function GET(req: Request, { params }: { params: { sala: string } }) {
  noStore();
  try {
    const sala = params.sala;

    // Crie o SQL dinâmico
    const sqlQuery = `
      SELECT * FROM chamadas
      WHERE sala = '${sala}' AND data::date = CURRENT_DATE AND status = 'espera'
      ORDER BY prioritario DESC, id;
    `;

    // Chama a função RPC passando o SQL
    const { data, error } = await supabase
      .rpc('execute_sql', { query: sqlQuery });

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
