// Ajuste o caminho conforme necessário
import { NextResponse } from 'next/server';
import supabase from '../../../utils/supabase-connect';

export async function GET(req: Request, res: Response) {

    try {
        const sqlQuery = `
            SELECT * FROM chamadas
            WHERE data::date = CURRENT_DATE
            ORDER BY id DESC;
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
export async function POST(req: Request) {
  try {
    const { paciente, atendimento, sala, prioritario, data, identificacao, status } = await req.json();

    // Insere os dados na tabela 'chamadas'
    const { data: result, error } = await supabase
      .from('chamadas')
      .insert([
        {
          paciente,
          atendimento,
          sala,
          prioritario,
          data,
          identificacao,
          status
        }
      ]);

    if (error) {
      throw error;
    }

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
 }

