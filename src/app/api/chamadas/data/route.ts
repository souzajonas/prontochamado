import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET(req: Request, res: Response) {
  noStore();
  try {
    const result = await sql`SELECT * FROM chamadas 
                              WHERE data::date = CURRENT_DATE 
                                AND horaChamado::date = CURRENT_DATE 
                              ORDER BY horaChamado DESC 
                              LIMIT 4;`;
    return new Response(JSON.stringify(result.rows), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}