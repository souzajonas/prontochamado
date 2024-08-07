
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';
import supabase from '../../../../../utils/supabase-connect';

export async function GET(req: Request) {
  noStore();
  try {
    // Crie o SQL dinâmico
    const sqlQuery = `
      SELECT * FROM chamadas
      WHERE data::date = CURRENT_DATE
        AND horaChamado::date = CURRENT_DATE
      ORDER BY horaChamado DESC
      LIMIT 4;
    `;

    // Chama a função RPC passando o SQL
    const { data, error } = await supabase
      .rpc('execute_sql', { query: sqlQuery });

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
