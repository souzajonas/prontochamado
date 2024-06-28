import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET(req: Request, { params }: { params: { id: string } }, res: Response) {
  noStore();
  try {
    const id = params.id;
    const result = await sql`SELECT * 
                               FROM chamadas 
                              WHERE data::date = CURRENT_DATE 
                                AND id <> ${id} 
                                AND status = 'atual' 
                                AND horaChamado IS NULL 
                              ORDER BY id 
                                LIMIT 1;`;
    return new Response(JSON.stringify(result.rows), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}