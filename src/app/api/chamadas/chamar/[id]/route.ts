
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';
import supabase from '../../../../../../utils/supabase-connect';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  noStore();
  try {
    const id = params.id;

    // Crie o SQL dinâmico
    const sqlQuery = `
      SELECT * 
      FROM chamadas 
      WHERE data::date = CURRENT_DATE 
        AND id <> ${id} 
        AND status = 'atual' 
        AND horaChamado IS NULL 
      ORDER BY id 
      LIMIT 1;
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
