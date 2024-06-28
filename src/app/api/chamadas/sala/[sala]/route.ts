import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET(req: Request, { params }: { params: { sala: string } }) {
  noStore();
  try{
    const { sala } = params;
    const result = await sql`SELECT * FROM chamadas WHERE sala = ${sala} AND data::date = CURRENT_DATE AND status = 'espera' ORDER BY prioritario DESC, id;`;
    return new Response(JSON.stringify(result.rows), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}