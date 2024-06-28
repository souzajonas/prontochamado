import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(req: Request, res: Response) {

    try {
    const result =
      await sql`SELECT * FROM chamadas
                 WHERE data::date = CURRENT_DATE
                ORDER BY id DESC;`; 
   return new Response(JSON.stringify(result.rows), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  }); 
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  
 }

 



export async function POST(req: Request) {
  const { paciente, atendimento, sala, prioritario, data, identificacao, status } = await req.json();
  
 try {
    const result =
      await sql`INSERT INTO chamadas (paciente, atendimento, sala, prioritario, data, identificacao, status) VALUES (${paciente}, ${atendimento}, ${sala}, ${prioritario}, ${data}, ${identificacao}, ${status});`;
   return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  
}

